import Game from "../../Services/Game/game";
import User from "../../Services/User/user";
import {getDurration} from '../List/ListItem/listItemLib';
export {gameOwnerToken, gameOpponentToken, timer, isPlayer}

let gameOwnerToken=-1;
let gameOpponentToken=-1;
let timer;

function isPlayer(){
  let res = (User.getToken()===gameOwnerToken)
      ||User.getToken()===gameOpponentToken;
  return res;
}
