import styles from "./Header.module.css";

import Container from "./UI/Container";

import { GiTennisBall } from "react-icons/gi";
import { GiTennisCourt } from "react-icons/gi";
import { GiTennisRacket } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

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
            <Container type="container-75">
                <nav className={styles.nav}>
                    <div className={styles.navMenu}>
                        <h1><GiTennisBall />Tennis Tournaments</h1>
                    </div>
                    <div className={styles.navMenu}>
                        <div className={isActivePage("players") ? styles.active : ""}><FaUsers /><h3 onClick={switchPageHandler}>Players</h3></div>
                        <div className={isActivePage("tournaments") ? styles.active : ""}><GiTennisCourt /><h3 onClick={switchPageHandler}>Tournaments</h3></div>
                        <div className={isActivePage("matches") ? styles.active : ""}><GiTennisRacket /><h3 onClick={switchPageHandler}>Matches</h3></div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header;