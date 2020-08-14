import React, { Component } from 'react';
import Board from '../Board/Board';
import styles from './TicTacToe.module.css';

class TicTacToe extends Component {
    state = {
        Xturn: true,
        squares: Array(9).fill(null),
        finished: false,
        moves: [],
        redoStack: []
    };

    handleClick = (i) =>{
        let squares = this.state.squares.slice();
        if(squares[i]!==null || this.state.finished)
            return
        if(this.state.Xturn)
            squares[i] = 'X';
        else
            squares[i] = 'O';
        let result = this.calculateWinner(squares)
        const moves = this.state.moves.slice();
        moves.push(i);
        
        this.setState({
            squares: squares, 
            Xturn: !this.state.Xturn, 
            finished: result, 
            moves: moves,
            redoStack: []
        });
    }

    calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }

    restart = () => {
        this.setState({
            Xturn:true,
            squares: Array(9).fill(null),
            finished: false,
            moves: [],
            redoStack: []
        })
    }

    undoMove = () => {
        const moves = this.state.moves.slice()
        if(moves.length > 0){
            const squares = this.state.squares.slice()
            const redoStack = this.state.redoStack.slice()
            let move = moves.pop()
            squares[move] = null;
            redoStack.push(move);


            this.setState({
                squares: squares, 
                Xturn: !this.state.Xturn, 
                finished: false, 
                moves: moves,
                redoStack: redoStack
            });
        }
    }

    redoMove = () => {
        const redoStack = this.state.redoStack.slice()
        if(redoStack.length > 0){
            const squares = this.state.squares.slice()
            const moves = this.state.moves.slice()
            let move = redoStack.pop()
            if(this.state.Xturn)
                squares[move] = 'X'
            else
                squares[move] = 'O'
            moves.push(move);
            let result = this.calculateWinner(squares)


            this.setState({
                squares: squares, 
                Xturn: !this.state.Xturn, 
                finished: result, 
                moves: moves,
                redoStack: redoStack
            });
        }
    }

    render() {
        if(this.state.finished){
            var status = 'Winner is ' + this.state.finished;//var status is hoisted
        }
        else{
            status = 'Next player: ' + (this.state.Xturn ? 'X' : 'O');
        }
        return (
            <div className={styles.Game}>
                <div className={styles.GameBoard}>
                    <div className={styles.Status}>{status}</div>
                    <Board squares={this.state.squares} onClick={this.handleClick}/>
                </div>
                <div className={styles.GameInfo}>
                    <button onClick={this.restart}>Restart Game</button>
                    <div className={styles.ActionButtons}>
                        <button disabled={this.state.moves.length<1} onClick={this.undoMove}>Undo</button>
                        <button disabled={this.state.redoStack.length<1} onClick={this.redoMove}>Redo</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TicTacToe;