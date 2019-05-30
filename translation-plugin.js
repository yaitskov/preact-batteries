"use strict";

const fs = require('fs');
const fPath = require('path');

Object.defineProperty(exports, "__esModule", {
  value: true
});

function json(o) {
  return JSON.stringify(o, null, 2);
}

class DAG {
  constructor() {
    this.sourceVertexes = {};
  }

  newEdge(src, dst) {
    let vertex = this.sourceVertexes[src];
    if (vertex) {
      if (vertex.indexOf(dst) < 0) {
        vertex.push(dst);
      }
    } else {
      this.sourceVertexes[src] = vertex = [dst];
    }
  }

  sources() {
    return Object.keys(this.sourceVertexes);
  }

  entries() {
    return Object.entries(this.sourceVertexes);
  }

  r(src) {
    return this.sourceVertexes[src];
  }
}

class Dictionaries {
  constructor() {
    this.dicts = {};
  }

  newEntry(fileName, msgId, paramNames) {
    let fileDict = this.dicts[fileName];
    if (!fileDict) {
      this.dicts[fileName] = fileDict = {};
    }
    let existingParams = fileDict[msgId];
    if (existingParams) {
      if (json(existingParams) != json(paramNames)) {
        throw new Error(
          `Params of message ${fileName}:${msgId} doesn't match:\n${json(existingParams)}\nvs:\n${json(paramNames)}`);
      }
    } else {
      fileDict[msgId] = paramNames;
    }
  }

  entries(file) {
    return Object.entries(this.dicts[file] || {});
  }
}

function newState() {
  return {
    dynamicImports: new DAG(),
    staticImports: new DAG(),
    dicts: new Dictionaries()
  };
}

function normalizedPath(state, params) {
  return state.file.opts.filename.substring(params.rootPrefixLength).replace(/[.]tsx$/, '');
}

function expandPath(source, mayBeLocalDest) {
  if (mayBeLocalDest.startsWith('.')) {
    return fPath.normalize(`${fPath.dirname(source)}${fPath.sep}${mayBeLocalDest}`);
  } else {
    return mayBeLocalDest;
  }
}

function fatalErr(msg, path, state) {
  return new Error(`${msg};
 Line ${json(path.node.loc)}
 in file ${state.file.opts.filename}`);
}

class JsxTranslator {
  constructor(result, params) {
    this.result = result;
    this.params = params;
  }

  translate(path, state) {
    const oEl = path.node.openingElement;
    if (oEl.name.name === this.params.tagName) {
      const attrIndex = this.indexAttrsByName(oEl.attributes);
      const msgTplAttr = attrIndex['m'];
      if (this.checkMsgTplAttr(msgTplAttr, path, state)) {
        this.result.dicts.newEntry(
          normalizedPath(state, this.params),
          msgTplAttr.value.value,
          Object.keys(attrIndex)
            .map(k => {
              if (k.length > 5) {
                throw fatalErr(`message parameter ${k} is too long. Max 5 letters`, path, state);
              }
              return k;
            }).filter(k => k !== 'm').sort());
      }
    }
  }

  checkMsgTplAttr(msgTplAttr, path, state) {
    if (!msgTplAttr) {
      throw fatalErr(
        `${this.params.tagName} tag must have attribute (m) for message template`,
        path, state);
    }
    if (msgTplAttr.type === 'JSXExpressionContainer') {
      // skill variable message template
      return false;
    } else if (msgTplAttr.value.type !== 'StringLiteral') {
      throw fatalErr(
        `m attribute must be string literal or expression but got ${msgTplAttr.value.type}`,
        path, state);
    }
    return true;
  }

  indexAttrsByName(attrs) {
    const result = {};
    attrs.forEach(attr => result[attr.name.name] = attr);
    return result;
  }
}

class BundleTranslator {
  constructor(result, params) {
    this.result = result;
    this.params = params;
    this.insideAwait = false;
  }

  translateCall(path, state) {
    if (!this.insideAwait) {
      return;
    }
    const arg = path.node;
    if (arg.callee.type === 'Import') {
      if (arg.arguments.length === 1) {
        if (arg.arguments[0].type === 'StringLiteral') {
          const source = normalizedPath(state, this.params);
          this.result.dynamicImports.newEdge(
            source,
            expandPath(source, arg.arguments[0].value));
        } else {
          throw fatalErr(`dynamic import accepts just literal string`,
                         path, state);
        }
      } else {
        throw fatalErr(
          `only 1 literal string is supported, but ${json(arg.arguments)}.`,
          path, state);
      }
    } else if (arg.callee.type === 'MemberExpression') {
      // skip ok
    } else {
      console.log(`skip callexpression with calle ${arg.callee.type}`);
    }
  }

  translateImport(path, state) {
    if (path.node.source.type === 'StringLiteral') {
      const source = normalizedPath(state, this.params);
      this.result.staticImports.newEdge(
        source, (source, path.node.source.value));
    } else {
      throw fatalErr(
        `import must have literal string argument but ${path.node.source.type}`,
        path, state);
    }
  }

  enterAwait() {
    this.insideAwait = true;
  }

  leaveAwait() {
    this.insideAwait = false;
  }
}

function makeVisitorFactory(result, params) {
  return () => {
    params.tagName = params.tagName || 'TI';

    const jsxTranslator = new JsxTranslator(result, params);
    const bundleTranslator = new BundleTranslator(result, params);

    return {
      visitor: {
        ImportDeclaration: {
          enter(path, state) {
            bundleTranslator.translateImport(path, state);
          }
        },
        CallExpression: {
          enter(path, state) {
            bundleTranslator.translateCall(path, state);
          }
        },
        AwaitExpression: {
          enter() {
            bundleTranslator.enterAwait();
          },
          exit() {
            bundleTranslator.leaveAwait();
          }
        },
        JSXElement: {
          enter(path, state) {
            jsxTranslator.translate(path, state);
          }
        }
      }
    };
  };
}

module.exports = { makeVisitorFactory, newState };
