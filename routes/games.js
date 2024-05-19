const gamesRouter = require('express').Router();

const findAllGames = require('../middlewares/games');
const sendAllGames = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById); 
gamesRouter.post("/games", findAllGames, createGame, sendGameCreated); 
gamesRouter.put("/games/:id", findGameById, checkIsVoteRequest, updateGame, sendGameUpdated); 
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted); 
gamesRouter.post("/games", findAllGames, checkEmptyFields, checkAuth, createGame, sendGameCreated); 
gamesRouter.put("/games/:id", findGameById, checkIsVoteRequest, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, updateGame, sendGameUpdated); 

module.exports = gamesRouter; 