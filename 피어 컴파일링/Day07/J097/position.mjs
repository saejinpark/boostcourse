const pos = {
  Rank1: 0, Rank2: 1, Rank3: 2, Rank4: 3, Rank5: 4, Rank6: 5, Rank7: 6, Rank8: 7,
  FileA: 0, FileB: 1, FileC: 2, FileD: 3, FileE: 4, FileF: 5, FileG: 6, FileH: 7
};

Object.freeze(pos);

class Position {
  constructor(file, rank){
    this.file = file;
    this.rank = rank;
  }

  toString(){
    //65 : A
    //49 : 1
    return String.fromCharCode(65+this.file, 49+this.rank);
  }
}

function isInBoard(file, rank){
  return file >= pos.FileA && file <= pos.FileH && rank >= pos.Rank1 && rank <= pos.Rank8; 
}

export { pos, Position, isInBoard };