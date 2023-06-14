import { IPool } from '@/utils/types/wallet';
import styles from './pooldisplay.module.scss';
import { fixed2 } from '@/utils/ts/pipe';
import { deletePool } from '@/utils/ts/api-base';
import { connect } from 'react-redux';
import { setToast } from '@/utils/store/toast';

function PoolDisplay({ pool, setToast }: { pool: IPool, setToast?: (message: string, color: string) => void }) {

  async function  deleteP() {
    const response = await deletePool('/api/pool/deletePool', pool);
    if (setToast) {
      if (response?.status === 200) {
        setToast(response.message, 'alert-success');
      } else {
        setToast(response?.message || 'Error', 'bg-red-500');
      }
    }
  }

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
            <button onClick={deleteP} className="btn btn-outline btn-error">Delete</button>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapToast = (state: any) => ({ ...state.toastReducer });

export default connect(mapToast, { setToast })(PoolDisplay);

