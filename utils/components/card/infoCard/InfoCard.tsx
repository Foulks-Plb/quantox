import styles from './infocard.module.scss';

export default function InfoCard({
  title,
  value,
  color = '#8BA372',
  symbol = '$',
}: {
  title: string;
  value: any;
  color?: string;
  symbol?: string;
}) {
  return (
    <div className={styles.infoCard} style={{ backgroundColor: color + '65' }}>
      <div className={styles.header}>
        <div
          className={styles.currency}
          style={{ backgroundColor: color + '80', color: color }}
        >
          <div>{symbol}</div>
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      {value ? (
        <div className={styles.value}>{symbol + ' ' + value}</div>
      ) : (
        <span className="loading loading-dots loading-md" style={{ color: color }}></span>
      )}
    </div>
  );
}
