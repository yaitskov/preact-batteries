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

  newStaticEdge(src, dst) {
    let vertex = this.sourceVertexes[src];
    if (!vertex) {
      this.sourceVertexes[src] = vertex = {};
    }
    vertex[dst] = 'static';
  }

  newDynamicEdge(src, dst) {
    let vertex = this.sourceVertexes[src];
    if (!vertex) {
      this.sourceVertexes[src] = vertex = {};
    }
    vertex[dst] = 'dynamic';
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
}

function normalizedPath(state) {
  return fPath.basename(state.file.opts.filename).replace(/[.]tsx$/, '');
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

exports.default = function (_ref) {
  const dag = new DAG();
  const dicts = new Dictionaries();
  //var t = _ref.types;

  return {
    visitor: {
      Program: {
        exit(path, state) {
          console.log(`File graph of ${state.file.opts.filename}:\n${json(dag.sourceVertexes)}`);
          console.log(`Dictionaries:\n${json(dicts.dicts)}`);
        }
      },
      ImportDeclaration: {
        enter(path, state) {
          if (path.node.source.type === 'StringLiteral') {
            const source = normalizedPath(state);
            dag.newStaticEdge(source,
                              expandPath(source, path.node.source.value));
          } else {
            throw fatalErr(
              `import must have literal string argument but ${path.node.source.type}`,
              path, state);
          }
        }
      },
      AwaitExpression: {
        enter(path, state) {
          const arg = path.node.argument;
          if (arg.type === 'CallExpression') {
            if (arg.type === 'Import') {
              if (arg.arguments.length === 1) {
                if (arg.arguments[0].type === 'StringLiteral') {
                  const source = normalizedPath(state);
                  dag.newDynamicEdge(source,
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
            } else {
              console.log(`skip call expression with calle ${arg.type}`);
            }
          } else {
            console.log(`skip await expression with ${path.node.argument.type}`);
          }
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
                const fileName = normalizedPath(state);
                console.log(`file name ${fileName} => ${state.file.opts.filename}`);
                dicts.newEntry(fileName, attrVal.value);
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
