const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '35.228.14.148',
  database: 'finalyearprojectdb',
  password: 'Daniel_joseph1',
})

const getGames = (request, response) => {
  pool.query('SELECT * FROM "Games"', (error, results) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).json(results.rows);
    }
  })
}

const getUsersGames = (request, response) => {
  const user_id = parseInt(request.params.user_id)

  pool.query('SELECT * FROM "Games" WHERE "user_id" = $1', [user_id], (error, results) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const getGamesById = (request, response) => {
  const game_id = parseInt(request.params.game_id);

  pool.query('SELECT * FROM "Games" WHERE "id" = $1', [game_id], (error, results) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createGame = (request, response) => {
  const { date, location, opposition, conditions, user_id } = request.body;

  pool.query('INSERT INTO "Games" ("date", "location", "opposition", "conditions", "user_id") VALUES ($1, $2, $3, $4, $5)', [date, location, opposition, conditions, user_id], (error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(201).send(`Game Added`)
    }
  })
}

const updateGame = (request, response) => {
  const game_id = parseInt(request.params.game_id);
  const { location } = request.body;

  pool.query('UPDATE "Games" SET "location" = $1 WHERE "game_id" = $2', [location, game_id], (error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).send(`Game modified with game_id: ${game_id}`);
    }
  })
}

const deleteGame = (request, response) => {
  const id = parseInt(request.params.game_id);

  pool.query('DELETE FROM "Games" WHERE "id" = $1', [id], (error) => {
    if (error) {
      response.status(500).json(error)
    } else {
      response.status(200).send(`Game deleted`)
    }
  })
}

module.exports = {
  getGames,
  getUsersGames,
  getGamesById,
  createGame,
  updateGame,
  deleteGame,
}