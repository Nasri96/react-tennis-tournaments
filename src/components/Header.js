import { useState } from "react";
import styles from "./Header.module.css";
import Container from "./UI/Container";

const Header = props => {
    const switchPageHandler = e => {
        props.onSwitchPage(e.target.textContent.toLowerCase());
    }

    const isActivePage = page => {
        if(props.active === page) {
            return true;
        }
        return false;
    }

    return (
        <header>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.navMenu}>
                        <h1>Tennis Tournaments</h1>
                    </div>
                    <div className={styles.navMenu}>
                        <h3 className={isActivePage("players") ? styles.active : ""} onClick={switchPageHandler}>Players</h3>
                        <h3 className={isActivePage("tournaments") ? styles.active : ""} onClick={switchPageHandler}>Tournaments</h3>
                        <h3 className={isActivePage("matches") ? styles.active : ""} onClick={switchPageHandler}>Matches</h3>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header;