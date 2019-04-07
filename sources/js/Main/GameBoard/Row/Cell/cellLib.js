export function getCellClassName(RowNumber,Number,CellData){
  let myClass = "cell";
  if (RowNumber===0){
    myClass = myClass + " cell_fr";
  }
  if (Number===0){
    myClass = myClass + " cell_fc";
  }
  if (CellData==="X"){
    myClass = myClass + " krestik";
  }
  if (CellData==="O"){
    myClass = myClass + " nolik";
  }
  return myClass;
}
