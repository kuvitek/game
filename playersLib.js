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
    let myGame={};
    myGame=myGames.find(elem=>elem.gameToken===tokenGame);
    if ((typeof(myGame)!="undefined")&&(myGame!=null)){
      myRes.owner = myGame["owner"];
      myRes.opponent = myGame["opponent"];
    }
  };
  return myRes;
};
export {timer, getPlayerNames};
