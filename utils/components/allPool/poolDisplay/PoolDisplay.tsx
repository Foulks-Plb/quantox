import { IPool } from '@/utils/types/wallet';
import styles from './pooldisplay.module.scss';
import { fixed2 } from '@/utils/ts/pipe';

export default function PoolDisplay({ pool }: { pool: IPool }) {
  return (
    <div className={styles.pool}>
      <div className={styles.poolHead}>
        <div className={styles.poolTitle}>
          <div className={styles.poolAmount}>{pool.amountNowA}</div>
          <div>{pool.tokenA}</div>
          <div>→</div>
          <div>{pool.valueNowA}$</div>
        </div>
        <div className={styles.poolTitle}>
          <div className={styles.poolAmount}>{pool.amountNowB}</div>
          <div>{pool.tokenB}</div>
          <div>→</div>
          <div>{pool.valueNowB}$</div>
        </div>
      </div>

      <div className={styles.poolTotal}>
        <strong>${fixed2((pool.valueNowA || 0 )+ (pool.valueNowB || 0 ))}</strong>
        <div className={styles.poolImperLoss}>-{pool.impermanentLoss}%</div>
      </div>

      <div className={styles.boutonDelete}>
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            type="button"
            className="btn btn-square btn-outline btn-sm btn-ghost"
          >
            ...
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <button className="btn btn-outline btn-error">Delete</button>
            {/* onClick={} */}
          </ul>
        </div>
      </div>
    </div>
  );
}
