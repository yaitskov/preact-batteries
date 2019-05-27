"use strict";

/*
      Identifier: {
        enter(path, state) {
          console.log(`Identifier ${path.node.name} in ${state.file.opts.filename}`);
        }
      }
*/


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      Program: {
        exit(path, state) {
        }
      },
      Class: {
        enter(path, state) {
        }
      },
      ClassMethod: {
        enter(path, state) {
        }
      },
      CallExpression: {
        enter(path, state) {
        }
      },
      JSXElement: {
      }
    }
  };
};
