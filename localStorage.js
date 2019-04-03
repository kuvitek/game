export {saveCurrentGame, getGameByToken, getGameByIndex, getCountGames, deleteGameByToken}

function saveCurrentGame(gameToken, game){
  let myGame = JSON.stringify(game);
  localStorage.setItem(gameToken, myGame);
}

function getGameByToken(tokenGame){
  return JSON.parse(localStorage.getItem(tokenGame))
}

function getGameByIndex(index){
  return JSON.parse(localStorage.getItem(localStorage.key(index)));
}

function getCountGames(){
  return localStorage.length;
}

function deleteGameByToken(tokenGame){
  localStorage.removeItem(tokenGame);
}
