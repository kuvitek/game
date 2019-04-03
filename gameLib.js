import User from "./user";
export {currGameToken, OWNER_WINNER, OPPONENT_WINNER, DRAW_WINNER, NO_WINNER, getResult, getDurration, initField, getWinner}

let currGameToken=-1;
var OWNER_WINNER = "owner";
var OPPONENT_WINNER = "opponent";
var DRAW_WINNER = "draw";
var NO_WINNER = "";

function getResult(code){
  let myResult={status:"",code:0,message: ""};
  myResult.code = code;
  if (code===0){
    myResult.status = "ok";
    myResult.message = "ok";
  }
  else{
    myResult.status = "error";
  }
  if (code===103){
    myResult.message = "Ошибка при проставлении хода";
  };
  if (code===104){
    myResult.message = "Текущая партия не установлена";
  };
  return myResult;
};

function getDurration(startDatetime,endDatetime){
  let myDate = new Date();
  if (endDatetime===0){
    return myDate.getTime()-startDatetime;
  }
  else {
    return endDatetime-startDatetime;
  }
};

function initField(size){
  let myArray = [];
  let mystring="";
  for (let i=0; i<size;i++){
     mystring=mystring+"?";
  };
  for (let i=0; i<size;i++){
     myArray.push(mystring);
  };
  return myArray;
};

function getWinner(field, owner, opponent){
  let ownerWinnerString="";
  let opponentWinnerString="";
  let myNAexist= false;
  let arrLen;
  let i;
  let i2;
  let tmpstr="";
  let myResult="";
  arrLen= field.length;
  let myArray= new Array(2*arrLen+2);
  for (i=0;i<2*arrLen+2;i++){
    myArray[i]="";
  }
  for(i=0;i<arrLen;i++){
    myArray[i]= myArray[i]+field[i];
    for(i2=0;i2<arrLen;i2++){
      myArray[arrLen+i2]=myArray[arrLen+i2]+field[i][i2];
      if (field[i][i2]==="?"){
        myNAexist=true;
      }
    }
    myArray[2*arrLen]=myArray[2*arrLen]+field[i][i];
    myArray[2*arrLen+1]=myArray[2*arrLen+1]+field[i][arrLen-1-i];
    ownerWinnerString=ownerWinnerString+"X";
    opponentWinnerString=opponentWinnerString+"O";
  };

  for(i=0;i<2*arrLen+2;i++){
    if (myArray[i]===ownerWinnerString){
      myResult = "owner";
    };
    if (myArray[i]===opponentWinnerString)	{
      myResult = "opponent";
    };
    if ((myResult==="")&&(!myNAexist)){
      myResult = "draw";
    }
  };
  return myResult;
};
