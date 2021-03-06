const express = require('express');
const bodyParser = require('body-parser');
const expressStaticGzip = require('express-static-gzip');

const app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const todos = [];

app
  .get('/j', (req, res) => {
    res.json({hello: 'world'});
  })
  .get('/todos', (req, res) => {
    res.json({todos: todos});
  })
  .post('/unique-action', (req, res) => {
    console.log(`check that action [${req.body.value}] is unique`);
    const collidingTodo = todos.find((todo) => todo.action === req.body.value);
    if (collidingTodo === undefined) {
      res.json({errors:[]});
    } else {
      res.json({errors:[{msgTmp:"name is busy", params: {name: req.body.value}}]});
    }
  })
  .post('/todo', (req, res) => {
    console.log("req " + JSON.stringify(req.body));
    todos.push(req.body);
    res.json({ok: 1});
  })
  .get('/h', (req, res) => {
    res.send('<html><body><b>hello world</b></body></html>');
  })
  .use('/translation', express.static('i18n-dicts'))
  .use('/',  expressStaticGzip(`${__dirname}/dist`, {
    enableBrotli: true,
    orderPreference: ['br', 'gzip']
  }));

const port = 8084;
app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
