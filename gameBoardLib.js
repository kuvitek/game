import Game from "./game";
import User from "./user";
import {getDurration} from './listItemLib';
export {gameOwnerToken, gameOpponentToken, timer, isPlayer}

let gameOwnerToken=-1;
let gameOpponentToken=-1;
let timer;

function isPlayer(){
  let res = (User.getToken()===gameOwnerToken)
      ||User.getToken()===gameOpponentToken;
  return res;
}
