import styles from './infocard.module.scss';

export default function InfoCard({ title, value}: any) {
    return (
        <div className={styles.infoCard}>
            <div className={styles.header}>
                <div className={styles.currency}>
                    <div>$</div>
                </div>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.value}>{'$ ' +value}</div>
        </div>     
    )
} 