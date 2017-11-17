export const emptyCells = (currentBoard) => {
  const indexes = [];
  currentBoard.forEach((cell, index) => {
    if (cell == null) {
          indexes.push(index);
        }
  });
  return indexes;
};

export const calculateWinner = (cells, player) => {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < conditions.length; i++) {
    const [a, b, c] = conditions[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c] && cells[a] === player) {
      return true;
    }
  }
  return null;
};

export const getRandomIntInclusive = (min, max) => {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum; //The maximum is inclusive and the minimum is inclusive
};
