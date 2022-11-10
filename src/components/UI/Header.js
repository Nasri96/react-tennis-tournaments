import styles from "./Header.module.css";
import Container from "./Container";

const Header = () => {
    return (
        <header>
            <Container>
                <nav className={styles.nav}>
                    <div className={styles.navMenu}>
                        <h1>Tennis Tournaments</h1>
                    </div>
                    <div className={styles.navMenu}>
                        <h3>Players</h3>
                        <h3>Tournaments</h3>
                        <h3>Matches</h3>
                    </div>
                </nav>
            </Container>
            
        </header>
    )
}

export default Header;