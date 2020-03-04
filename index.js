const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries.js');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgress API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/games', db.getGames);
app.get('/games/:game_id', db.getGamesById);
app.get('/games/userGames/:user_id', db.getUsersGames);

app.post('/games', db.createGame);

app.put('/games/:game_id', db.updateGame);

app.delete('/games/:game_id', db.deleteGame);
