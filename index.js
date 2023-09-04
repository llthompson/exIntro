
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

let { users } = require('./state')

app.use(express.json());

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  res.send(users)
});

app.get('/users/:_id', (req, res) => {
  const user = users.find((user) => user._id === parseInt(req.params._id));
  console.log('is this a user', user)
  res.send(user)
});

app.post('/users', (req, res) => {
  console.log('body', req.body)
  const newUser = {
    ...req.body,
    _id: users.length + 1
  };
  users.push(newUser);
  res.json(newUser);
});


app.put('/users/:_id', (req, res) => {
  const userIndex = users.findIndex((user) => user._id === parseInt(req.params._id))
  for (let key of Object.keys(req.body)) {
    users[userIndex][key] = req.body[key]
  }
  console.log('changing', userIndex)
  res.send(users[userIndex])
});



/* END - create routes here */

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`))