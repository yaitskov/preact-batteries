const express = require('express');
const app = express();

const todos = [];

app
  .get('/j', (req, res) => {
    res.json({hello: 'world'});
  })
  .get('/todos', (req, res) => {
    res.json({todos: todos});
  })
  .post('/todo', (req, res) => {
    console.log("req " + JSON.stringify(req.body));
    todos.push(req.body);
    res.json({ok: 1});
  })
  .get('/h', (req, res) => {
    res.send('<html><body><b>hello world</b></body></html>');
  })
  .use('/', express.static('dist'));

const port = 8084;
app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
