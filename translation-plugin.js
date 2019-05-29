"use strict";

const fs = require('fs');
const fPath = require('path');

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

  newEntry(fileName, msgId) {
    let fileDict = this.dicts[fileName];
    if (!fileDict) {
      this.dicts[fileName] = fileDict = {};
    }
    fileDict[msgId] = [];
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

function json(o) {
  return JSON.stringify(o, null, 2);
}

function fatalErr(msg, path, state) {
  return new Error(`${msg};
 Line ${json(path.node.loc)}
 in file ${state.file.opts.filename}`);
}

function makeVisitorFactory(result, params) {
  return () => {
    let insideAwait = false;
    return {
      visitor: {
        Program: {
          exit(path, state) {
            // console.log(`File graph of ${state.file.opts.filename}:\n${json(dag.sourceVertexes)}`);
            // console.log(`Dictionaries:\n${json(dicts.dicts)}`);
          }
        },
        ImportDeclaration: {
          enter(path, state) {
            if (path.node.source.type === 'StringLiteral') {
              const source = normalizedPath(state, params);
              result.staticImports.newEdge(source,
                                           expandPath(source, path.node.source.value));
            } else {
              throw fatalErr(
                `import must have literal string argument but ${path.node.source.type}`,
                path, state);
            }
          }
        },
        CallExpression: {
          enter(path, state) {
            if (!insideAwait) {
              return;
            }
            const arg = path.node;
            if (arg.callee.type === 'Import') {
              if (arg.arguments.length === 1) {
                if (arg.arguments[0].type === 'StringLiteral') {
                  const source = normalizedPath(state, params);
                  result.dynamicImports.newEdge(source,
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
        },
        AwaitExpression: {
          enter(path, state) {
            insideAwait = true;
          },
          exit() {
            insideAwait = false;
          }
        },
        JSXElement: {
          enter(path, state) {
            const oEl = path.node.openingElement;
            if (oEl.name.name === 'TI') {
              if (oEl.attributes.length === 1) {
                const attr = oEl.attributes[0];
                if (attr.name.name !== 'm') {
                  throw fatalErr('TI tag must have attribute (m)', path, state);
                }
                const attrVal = attr.value;
                if (attrVal.type === 'StringLiteral') {
                  const fileName = normalizedPath(state, params);
                  result.dicts.newEntry(fileName, attrVal.value);
                } else {
                  throw fatalErr('attribute m of TI must be a string literal', path, state);
                }
              } else {
                throw fatalErr('TI tag must have 1 attribute (m)', path, state);
              }
            }
          }
        }
      }
    };
  };
}

module.exports = { makeVisitorFactory, newState };
