class MergeAndFlushI18nPlugin {
  constructor(dicts, dag) {
    this.dicts = dicts;
    this.dag = dag;
  }

  apply(compiler) {
    compiler.hooks.done.tap('Hello World Plugin', stats =>  console.log('Hello World DONE!'));
    compiler.hooks.afterCompile.tap('Hello World Plugin', stats =>  console.log('Hello World After compile!'));
    compiler.hooks.compile.tap('Hello World Plugin', stats =>  console.log('Hello World compile!'));
  }
}

module.exports = MergeAndFlushI18nPlugin;
