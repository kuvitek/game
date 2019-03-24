'use strict;'
import User from "./user";
let currGameToken = -1;
function getRes(code){
  let myRes={status:"",code:0,message: ""};
  myRes.code = code;
  if (code==0){
    myRes.status = "ok";
    myRes.message = "ok";
  }
  else{
    myRes.status = "error";
  }
  if (code==103){
    myRes.message = "Ошибка при проставлении хода";
  };
  if (code==104){
    myRes.message = "Текущая партия не установлена";
  };
  return myRes;
};
function getDurration(startDatetime,endDatetime){
  let myd = new Date();
  let myMS;
  if (endDatetime===0){
    myMS=myd.getTime()-startDatetime;
  }
  else {
    myMS=endDatetime-startDatetime;
  }
  return myMS;
};
export default class Game {
  constructor(owner, size) {
    if (User.getName==={}){
      new User(owner);
    };
    let myDate = new Date();
    currGameToken = Math.round(Math.random()*100000000000);
    this.gameToken= currGameToken;
    this.owner= owner;
    this.ownerToken=User.getToken();
    this.opponent=""; // присоединенный игрок
    this.opponentToken=-1;
    this.size= size; // размер игрового поля
    this.startGameDate = myDate.getTime(); // дата и время создания игры
    this.endGameDate = 0; // дата окончания игры
    this.gameResult= ""; // кто выиграл партию "" || "owner" || "opponent" || "draw"
    this.state= "ready"; // статус игры, "ready” – готов, "playing” –идет игра, "done” - завершена
    this.lastUserStep=User.getToken();
    this.field = initField(size);
    function initField(size){
      let arr = [];
      let mystring="";
      for (let i=0; i<size;i++){
         mystring=mystring+"?";
      };
      for (let i=0; i<size;i++){
         arr.push(mystring);
      };
      return arr;
    };
  };
  static newGame(owner, size){
    let myGame={};
    let res={};
    let serialGames;
    try{
      myGame = new Game(owner,size);
      serialGames = JSON.stringify(myGame);
      localStorage.setItem(currGameToken, serialGames);
      res = {
            status: "ok",
            code:0,
            accessToken: myGame.ownerToken,
            gameToken: myGame.gameToken,
            message: "ok"
          };
    }
    catch{
      res = {
            status: "error",
            code:100,
            accessToken: "",
            gameToken: "",
            message: "Ошибка при создании игры"
          };
    };
    return res;
  };

  static getList(){
      let myGames = [];
      let localGame = {};
      let myGame = {"gameToken":-1,
                    "owner": "",
                    "ownerToken":-1,
                    "opponent":"", // присоединенный игрок
                    "opponentToken":-1,
                    "size": 0, // размер игрового поля
                    "startGameDate": 0,// дата и время создания игры
                    "endGameDate": 0, // дата окончания игры
                    "gameDuration":0,
                    "gameResult": "", // кто выиграл партию "" || "owner" || "opponent" || "draw"
                    "state": "", // статус игры, "ready” – готов, "playing” –идет игра, "done” - завершена
                    "lastUserStep":-1,
                    "field":[]
                  };
      let index;
      if (localStorage.length>0){
        for (index=0;index<localStorage.length;index++){
          localGame=JSON.parse(localStorage.getItem(localStorage.key(index)));
          myGame.gameToken=localGame.gameToken;
          myGame.owner=localGame.owner;
          myGame.ownerToken=localGame.ownerToken;
          myGame.opponent=localGame.opponent;
          myGame.opponentToken=localGame.opponentToken;
          myGame.size=localGame.size;
          myGame.startGameDate=localGame.startGameDate;
          myGame.endGameDate=localGame.endGameDate;
          myGame.gameDuration=getDurration(localGame.startGameDate,localGame.endGameDate);
          myGame.gameResult=localGame.gameResult;
          myGame.state=localGame.state;
          myGame.lastUserStep=localGame.lastUserStep;
          myGame.field=localGame.field;
          if ((myGame.gameDuration<10000)||(myGame.state!="ready")){
            myGames.push(myGame);
          }
          else {
            if (currGameToken==myGame.gameToken){
//              localStorage.splice(index,1);
  //            index--;
              console.log("delete");
              delete localStorage[index];
//              currGameToken=-1;
            }
          }
        }
      };
      let res={
          status: "ok",
          code: 0,
          games: myGames
      };
      return res;
  };

  static joinGame(tokenGame,opponent){
    let myCurrGame={};
    let res={};
    let serialGame;
    if (User.getName()==={}){
      new User(opponent);
    };
    myCurrGame = JSON.parse(localStorage.getItem(tokenGame));
    if ((myCurrGame!=undefined)
        &&!(myCurrGame==={})){
        if ((myCurrGame["opponent"]==="")
            &&(myCurrGame["state"]==="ready")){
           myCurrGame["opponent"]=opponent;
           myCurrGame["opponentToken"]=User.getToken();
           myCurrGame["state"]="playing";
           myCurrGame["lastUserStep"]=User.getToken();
           serialGame = JSON.stringify(myCurrGame);
           localStorage.setItem(tokenGame,serialGame);
        };
        res = {
              status: "ok",
              code:0,
              accessToken: User.getToken(),
              message: "ok"
            };
      currGameToken = myCurrGame.gameToken;
    }
    else {
      res={
            status: "error",
            code:102,
            accessToken: "",
            message: "Ошибка при поиске игры"
      };
    };
    return res;
  };

  static doStep(row, col){
    let res={};
    let valueStep;
    let myCurrGame={};
    if (currGameToken!=-1){
      myCurrGame = JSON.parse(localStorage.getItem(currGameToken));
      if ((myCurrGame!=undefined)
          &&!(myCurrGame==={})){
            if (myCurrGame.owner==User.getName()){
              valueStep="X";
            }
            else{
              valueStep="O";
            };
            if ((row==-1)&&col==-1){
              myCurrGame.state="done";
              let myDate = new Date();
              myCurrGame.endGameDate = myDate.getTime();
              if (valueStep=="X"){
                myCurrGame.gameResult="opponent";
              }
              else {
                myCurrGame.gameResult="owner";
              }
            }
            else {
              let myRow="";
              let index;
              for(index=0; index<myCurrGame.field[row].length;index++){
                if(index==col){
                  myRow=myRow+valueStep;
                }
                else {
                  myRow=myRow+myCurrGame.field[row][index];
                }
              }
              myCurrGame.field[row]=myRow;
              myCurrGame.lastUserStep=User.getToken();
            };
            let serialGame = JSON.stringify(myCurrGame);
            localStorage.setItem(currGameToken, serialGame);
            res = getRes(0);
      }
      else {
        res=getRes(103);
      }
    }
    else {
      res=getRes(104);
    }
  };

  static getState(){
    let res={};
    function currentTurn(lastUserStep){
      let res=false;
      if (lastUserStep!=User.getToken()){
        res=true;
      }
      else {
        res=false;
      }
      return res;
    };
    function getWinner(field, owner, opponent){
      let winstr1="";
      let winstr2="";
      let myNAexist= false;
      let arrLen;
      let i;
      let i2;
      let tmpstr="";
      let myRes="";
      arrLen= field.length;
      let res= new Array(2*arrLen+2);
      for (i=0;i<2*arrLen+2;i++){
        res[i]="";
      }
      for(i=0;i<arrLen;i++){
          res[i]= res[i]+field[i];
          for(i2=0;i2<arrLen;i2++){
            res[arrLen+i2]=res[arrLen+i2]+field[i][i2];
            if (field[i][i2]=="?"){
              myNAexist=true;
            }
          }
          res[2*arrLen]=res[2*arrLen]+field[i][i];
          res[2*arrLen+1]=res[2*arrLen+1]+field[i][arrLen-1-i];
          winstr1=winstr1+"X";
          winstr2=winstr2+"O";
      };
      for(i=0;i<2*arrLen+2;i++){
          if (res[i]==winstr1){
            myRes = "owner";
          };
          if (res[i]==winstr2)	{
            myRes = "opponent";
          };
          if ((myRes==="")&&(!myNAexist)){
            myRes = "draw";
          }
        };
        return myRes;
      };
    if (currGameToken!=-1){
      let myCurrGame={};
      console.log("check");
      myCurrGame = JSON.parse(localStorage.getItem(currGameToken));
      if ((typeof(myCurrGame)!="undefined")
          &&!(myCurrGame==={})){
            res={
                  status: "ok",
                  code: 0,
                  youTurn: currentTurn(myCurrGame.lastUserStep), //true, // true если сейчас ходит запрашивающий
                  gameDuration: getDurration(myCurrGame.startGameDate,myCurrGame.endGameDate), // в миллисекундах
                  field: JSON.parse(localStorage.getItem(currGameToken))["field"],
                  winner : getWinner(JSON.parse(localStorage.getItem(currGameToken))["field"],myCurrGame.owner,myCurrGame.opponent) // выставляется если в игре определился победитель
            };
            if (res.winner!=""){
              myCurrGame.state= "done";
              let myDate = new Date();
              myCurrGame.endGameDate = myDate.getTime();
              myCurrGame.gameResult=res.winner;
            }
            else{
              if ((myCurrGame.state==="done")
                &&(myCurrGame.gameResult!="")){
                  res.winner = myCurrGame.gameResult;
                }
            }
            let serialGame = JSON.stringify(myCurrGame);
            localStorage.setItem(currGameToken, serialGame);
      }
      else {
        res=getRes(103);
      }
    }
    else {
      res=getRes(104);
    }
    return res;
  };

}
