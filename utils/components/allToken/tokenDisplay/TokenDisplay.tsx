import { deleteToken } from '@/utils/ts/api-base';
import styles from './tokendisplay.module.scss';
import { connect } from 'react-redux';
import { setToast } from '@/utils/store/toast';
import { Token } from '@/utils/types/wallet';

function TokenDisplay({ token, setToast}: { token: Token, setToast?: (message: string, color: string) => void }) {
  async function  deleteT() {
    const response = await deleteToken('/api/deleteToken', token);
    if (setToast) {
      if (response?.status === 200) {
        setToast(response.message, 'alert-success');
      } else {
        setToast(response?.message || 'Error', 'bg-red-500');
      }
    }
  }

  return (
    <div className={styles.token}>
      <div className={styles.tokenHead}>
        <div className={styles.tokenTitle}>
          <div className={styles.tokenAmount}>{token.amount}</div>
          <div>{token.token}</div>
        </div>
        <div className="flex">
          {token.locationBlockchain && (
            <div className={styles.tokenBlockchain}>
              {token.locationBlockchain}
            </div>
          )}
          {token.locationApp && <div>{token.locationApp}</div>}
        </div>
      </div>
      <div className={styles.tokenBody}>
        <div className={styles.tokenCurrency}>$</div>
        <div>{token.value}</div>
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
            <button className="btn btn-outline btn-error" onClick={deleteT}>Delete</button>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapToast = (state: any) => ({ ...state.toastReducer });

export default connect(mapToast, { setToast })(TokenDisplay);
