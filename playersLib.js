import User from "./user";
import Game from "./game";
let timer;
function getPlayerNames(tokenGame){
  let myRes={
    owner:User.getName(),
    opponent:""
  };
  if(tokenGame!=-1){
    let myGames = [];
    myGames = Game.getList().games;
    myRes.owner = myGames.find(elem=>elem.gameToken===tokenGame)["owner"];
    myRes.opponent = myGames.find(elem=>elem.gameToken===tokenGame)["opponent"];
  };
  return myRes;
};
export {timer, getPlayerNames};
