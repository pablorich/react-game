import React from 'react';
import Square from '../Square/Square';
import styles from './Board.module.css';

const Board = (props) => {
    const renderSquare = (i) => {
        return <Square value={props.squares[i]} onClick={()=> props.onClick(i)}/>;
    }
   
    return (
        <div>
        <div className={styles.BoardRow}>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className={styles.BoardRow}>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className={styles.BoardRow}>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
        </div>
    );
}

export default Board;