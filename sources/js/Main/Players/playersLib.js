import Game from "../../Services/Game/game";
import User from "../../Services/User/user";
export {timer, getPlayerNames}

let timer;

function getPlayerNames(tokenGame){
  let myResult={
    owner:User.getName(),
    opponent:""
  };

  if(tokenGame!=-1){
    let myGames = [];
    myGames = Game.getList().games;
    let myGame={};
    myGame=myGames.find(item=>item.gameToken===tokenGame);
    if ((typeof(myGame)!="undefined")&&(myGame!=null)){
      myResult.owner = myGame["owner"];
      myResult.opponent = myGame["opponent"];
    }
  }

  return myResult;
};
