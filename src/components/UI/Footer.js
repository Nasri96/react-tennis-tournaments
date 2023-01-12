import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>React Tennis Tournaments &copy; {new Date(Date.now()).getFullYear()}</p>
            <p><a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com/free-icons/tennis" title="tennis icons">Tennis icons created by Those Icons - Flaticon</a></p>
        </footer>
    )
}

export default Footer;