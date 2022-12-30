import styles from  "./Container.module.css";

const Container = props => {
    const containerType = props.type;

    return (
        <div className={styles[containerType]}>{props.children}</div>
    )
}

export default Container;