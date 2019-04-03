'use strict;'
import User from "./user";
import * as Lib from './gameLib';
import * as MyStorage from './localStorage';

var DOWNTIME = 300000; //время простоя игры в статусе "ready"
var GAME_READY = "ready";
var GAME_PLAYING = "playing";
var GAME_DONE = "done";

export default class Game {
  constructor(owner, size) {
    if (User.getName==={}){
      new User(owner);
    };
    let myDate = new Date();
    Lib.currGameToken = Math.round(Math.random()*100000000000);
    this.gameToken= Lib.currGameToken;
    this.owner= owner;
    this.ownerToken=User.getToken();
    this.opponent=""; // присоединенный игрок
    this.opponentToken=-1;
    this.size= size; // размер игрового поля
    this.startGameDate = myDate.getTime(); // дата и время создания игры
    this.endGameDate = 0; // дата окончания игры
    this.gameResult= Lib.NO_WINNER; // кто выиграл партию "" || "owner" || "opponent" || "draw"
    this.state= GAME_READY; // статус игры, "ready” – готов, "playing” –идет игра, "done” - завершена
    this.lastUserStep=User.getToken();
    this.field = Lib.initField(size);
  };

  static newGame(owner, size){
    let myGame={};
    let myResult={};
    let serialGames;
    try{
      myGame = new Game(owner,size);
      MyStorage.saveCurrentGame(Lib.currGameToken,myGame);
      myResult = {
                    status: "ok",
                    code:0,
                    accessToken: myGame.ownerToken,
                    gameToken: myGame.gameToken,
                    message: "ok"
      };
    }
    catch{
      myResult = {
                    status: "error",
                    code:100,
                    accessToken: "",
                    gameToken: "",
                    message: "Ошибка при создании игры"
      };
    };
    return myResult;
  };

  static getList(){
    let myListGames = [];
    let index;
    if (MyStorage.getCountGames()>0){
      for (index=0;index<MyStorage.getCountGames();index++){
        let myGame = {"gameToken":-1,
                      "owner": "",
                      "ownerToken":-1,
                      "opponent":"", // присоединенный игрок
                      "opponentToken":-1,
                      "size": 0, // размер игрового поля
                      "startGameDate": 0,// дата и время создания игры
                      "endGameDate": 0, // дата окончания игры
                      "gameDuration":0,
                      "gameResult": Lib.NO_WINNER, // кто выиграл партию "" || "owner" || "opponent" || "draw"
                      "state": "", // статус игры, "ready” – готов, "playing” –идет игра, "done” - завершена
                      "lastUserStep":-1,
                      "field":[]
                    };
        let localGame = {};
        localGame = MyStorage.getGameByIndex(index);
        myGame.gameToken=localGame.gameToken;
        myGame.owner=localGame.owner;
        myGame.ownerToken=localGame.ownerToken;
        myGame.opponent=localGame.opponent;
        myGame.opponentToken=localGame.opponentToken;
        myGame.size=localGame.size;
        myGame.startGameDate=localGame.startGameDate;
        myGame.endGameDate=localGame.endGameDate;
        myGame.gameDuration=Lib.getDurration(localGame.startGameDate,localGame.endGameDate);
        myGame.gameResult=localGame.gameResult;
        myGame.state=localGame.state;
        myGame.lastUserStep=localGame.lastUserStep;
        myGame.field=localGame.field;
        if ((myGame.gameDuration>DOWNTIME)&&(myGame.state===GAME_READY)){
          if (Lib.currGameToken===myGame.gameToken){
            MyStorage.deleteGameByToken(Lib.currGameToken)
            Lib.currGameToken=-1;
          }
        }
        else {
          myListGames.push(myGame);
        }
      }
    };
    let myResult={
                    status: "ok",
                    code: 0,
                    games: myListGames
        };
    return myResult;
  };

  static joinGame(tokenGame,opponent){
    let myCurrGame={};
    let myResult={};
    let serialGame;
    if (User.getName()==={}){
      new User(opponent);
    };

    myCurrGame = MyStorage.getGameByToken(tokenGame);
    if ((typeof(myCurrGame)==="undefined")
       ||(myCurrGame===null)){
         myResult={
                     status: "error",
                     code:102,
                     accessToken: "",
                     message: "Ошибка при поиске игры"
         };
         return myResult;
    };
    if ((myCurrGame["opponent"]==="")
        &&(myCurrGame["state"]===GAME_READY)){
       myCurrGame["opponent"]=opponent;
       myCurrGame["opponentToken"]=User.getToken();
       myCurrGame["state"]=GAME_PLAYING;
       myCurrGame["lastUserStep"]=User.getToken();
       MyStorage.saveCurrentGame(tokenGame,myCurrGame)
    };
    myResult = {
                  status: "ok",
                  code:0,
                  accessToken: User.getToken(),
                  message: "ok"
    };
    Lib.currGameToken = myCurrGame.gameToken;
    return myResult;
  };

  static doStep(row, col){
    let valueStep;
    let myCurrGame={};
    if (Lib.currGameToken===-1){
      return Lib.getResult(104);
    }
    //let myGame=localStorage.getItem(Lib.currGameToken);
    let myGame = MyStorage.getGameByToken(Lib.currGameToken);
    if (myGame===null){
      return Lib.getResult(104);
    }
    myCurrGame = myGame;
    if ((typeof(myCurrGame)==="undefined")
         ||(myCurrGame===null)){
      return Lib.getResult(104);
    };
    if (myCurrGame.owner===User.getName()){
        valueStep="X";
    }
    else{
        valueStep="O";
    };
    if ((row===-1)&&col===-1){
      myCurrGame.state=GAME_DONE;
      let myDate = new Date();
      myCurrGame.endGameDate = myDate.getTime();
      if (valueStep==="X"){
          myCurrGame.gameResult=Lib.OPPONENT_WINNER;
      }
      else {
          myCurrGame.gameResult=Lib.OWNER_WINNER;
      }
    }
    else {
      let myRow="";
      let index;
      for(index=0; index<myCurrGame.field[row].length;index++){
        if(index===col){
          myRow=myRow+valueStep;
        }
        else {
          myRow=myRow+myCurrGame.field[row][index];
        }
      }
      myCurrGame.field[row]=myRow;
      myCurrGame.lastUserStep=User.getToken();
    };
    MyStorage.saveCurrentGame(Lib.currGameToken,myCurrGame)
    return Lib.getResult(0);
  };

  static getState(){
    let stateResult={};
    function currentTurn(lastUserStep){
      if (lastUserStep!=User.getToken()){
        return true;
      }
      else {
        return false;
      };
    };

    if (Lib.currGameToken===-1){
        return Lib.getResult(104);
    };
    let myGame = MyStorage.getGameByToken(Lib.currGameToken);
    if (myGame===null){
      return Lib.getResult(104);
    }

    let myCurrGame={};
    myCurrGame = myGame;
    if ((typeof(myCurrGame)==="undefined")
       ||(myCurrGame===null)){
      return Lib.getResult(104);
    };

    stateResult={
          status: "ok",
          code: 0,
          youTurn: currentTurn(myCurrGame.lastUserStep), //true, // true если сейчас ходит запрашивающий
          gameDuration: Lib.getDurration(myCurrGame.startGameDate,myCurrGame.endGameDate), // в миллисекундах
          field: MyStorage.getGameByToken(Lib.currGameToken)["field"],
          winner : Lib.getWinner(MyStorage.getGameByToken(Lib.currGameToken)["field"],myCurrGame.owner,myCurrGame.opponent) // выставляется если в игре определился победитель
    };
    if (stateResult.winner===""){
      if ((myCurrGame.state===GAME_DONE)
        &&(myCurrGame.gameResult!=Lib.NO_WINNER)){
          stateResult.winner = myCurrGame.gameResult;
      }
    }
    else{
      myCurrGame.state= GAME_DONE;
      let myDate = new Date();
      myCurrGame.endGameDate = myDate.getTime();
      myCurrGame.gameResult=stateResult.winner;
    }
    MyStorage.saveCurrentGame(Lib.currGameToken,myCurrGame)
    return stateResult;
  };
}
