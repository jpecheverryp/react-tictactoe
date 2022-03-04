import React, { useState } from 'react';

const Board = ({ changeText }) => {
  const [board, setBoard] = useState([
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]);
  const [playerTurn, setPlayerTurn] = useState('X');
  const [hasFinished, setHasFinished] = useState(false);

  const handleClick = (boardIndex) => {
    if (!hasFinished) {
      if (checkIfValid(board, boardIndex)) {
        placeLetter(boardIndex);
        if (didWin()) {
          changeText('PLAYER ' + playerTurn + ' HAS WON!!');
          setHasFinished(true);
        } else {
          if (isFull()) {
            changeText('IT WAS A TIE!');
            setHasFinished(true);
          } else {
            toggleTurn();
          }
        }
      }
    }
  };

  const isFull = () => {
    let output = true;
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile === ' ') {
          output = false;
        }
      });
    });

    return output;
  };

  const didWin = () => {
    return (
      // Horizontal
      (board[0][0] === board[0][1] &&
        board[0][0] === board[0][2] &&
        board[0][0] === playerTurn) ||
      (board[1][0] === board[1][1] &&
        board[1][0] === board[1][2] &&
        board[1][0] === playerTurn) ||
      (board[2][0] === board[2][1] &&
        board[2][0] === board[2][2] &&
        board[2][0] === playerTurn) ||
      // Vertical
      (board[0][0] === board[1][0] &&
        board[0][0] === board[2][0] &&
        board[0][0] === playerTurn) ||
      (board[0][1] === board[1][1] &&
        board[0][1] === board[2][1] &&
        board[0][1] === playerTurn) ||
      (board[0][2] === board[1][2] &&
        board[0][2] === board[2][2] &&
        board[0][2] === playerTurn) ||
      // Diagonal
      (board[0][0] === board[1][1] &&
        board[0][0] === board[2][2] &&
        board[0][0] === playerTurn) ||
      (board[0][2] === board[1][1] &&
        board[0][2] === board[2][0] &&
        board[0][2] === playerTurn)
    );
  };

  const toggleTurn = () => {
    setPlayerTurn((playerTurn) => {
      if (playerTurn === 'X') {
        changeText('Player Turn: O');
        return 'O';
      }
      if (playerTurn === 'O') {
        changeText('Player Turn: X');
        return 'X';
      }
    });
  };

  const placeLetter = (boardIndex) => {
    const y = Math.floor(boardIndex / 3);
    const x = boardIndex % 3;
    const newBoard = [...board];
    newBoard[y][x] = playerTurn;
    setBoard(newBoard);
  };

  const checkIfValid = (board, index) => {
    // Checks if the the clicked tile is valid to place a symbol
    return board[Math.floor(index / 3)][index % 3] === ' ';
  };

  return (
    <div>
      {board.map((row, y) => (
        <Row handleClick={handleClick} key={y} y={y} row={row}></Row>
      ))}
    </div>
  );
};

const Row = ({ row, y, handleClick }) => {
  return (
    <div className='row'>
      {row.map((tile, x) => (
        <BoardTile
          handleClick={handleClick}
          key={y * 3 + x}
          boardIndex={y * 3 + x}
          tile={tile}
        ></BoardTile>
      ))}
    </div>
  );
};
const BoardTile = ({ tile, boardIndex, handleClick }) => {
  return (
    <div className='board-tile' onClick={(e) => handleClick(boardIndex)}>
      <span>{tile}</span>
    </div>
  );
};

export default Board;
