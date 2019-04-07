import User from "../../../Services/User/user";
export {getClassName, getOwnerClassName, getOpponentClassName, getMarkClassName, getDurration}

function getClassName(gameState, gameOwner){
  let myClassName;
  if (gameState==="ready"){
      myClassName = "newGame";
  };
  if (gameState==="playing"){
      myClassName = "currGame";
  };
  if (gameState==="done"){
      myClassName = "endingGame";
  };
  if ((User.getName()===gameOwner)||(myClassName === "endingGame")){
      myClassName=myClassName+" no-cursor";
  }
  return myClassName;
};

function getOwnerClassName(gameState, gameResult){
  let myClassName;
  myClassName = "player1";
  if (gameState!="ready"){
      myClassName = myClassName + " separetorPlayers";
  };
  if ((gameResult!="")&&(gameResult!="opponent")){
      myClassName = myClassName + " winner";
  }
  return myClassName;
};

function getOpponentClassName(gameState, gameResult){
  let myClassName;
  myClassName = "player2";
  if ((gameResult!="")&&(gameResult!="owner")){
      myClassName = myClassName + " winner";
  }
  return myClassName;
};

function getMarkClassName(typePlayer, gameResult){
  let myClassName;
  myClassName = "mark";
  if((typePlayer!=gameResult)&&(gameResult!="draw")){
    myClassName=myClassName+" hidden";
  }
  return myClassName;
};

function getDurration(timeGame){
  let mySEC=Math.floor(timeGame/1000);
  let sec="00";
  let mins="00";
  let hours="00";
  sec=String(mySEC%60);
  if(sec<10){
    sec="0"+String(sec);
  };
  mins=String(Math.floor(mySEC/60));
  mins=String(mins%60);
  if(mins<10){
    mins="0"+String(mins);
  };
  hours=String(Math.floor(mySEC/3600));
  if(hours<10){
    hours="0"+String(hours);
  };
  let myTime = hours+":"+mins+":"+sec;
  return myTime;
};
