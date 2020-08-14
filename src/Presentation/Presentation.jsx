import React from 'react';
import TicTacToe from '../Game/TicTacToe';
import HeaderBar from './HeaderBar/HeaderBar';
import FooterBar from './FooterBar/FooterBar';

import styles from './Presentation.module.css';

const Presentation = () => {
    return (
        <div className={styles.PageContainer}>
            <div className={styles.ContentWrap}>
                <HeaderBar />
                <TicTacToe />
                <TicTacToe />
                <TicTacToe />
                <TicTacToe />
                <TicTacToe />
            </div>
            <div className={styles.Footer}>
                <FooterBar />
            </div>
        </div>
    )
}

export default Presentation;