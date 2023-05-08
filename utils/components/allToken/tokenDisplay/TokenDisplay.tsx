import { deleteId } from '@/utils/ts/api-base';
import styles from './tokendisplay.module.scss';

export default function TokenDisplay({ token }: any) {
  function deleteToken() {
    deleteId('/backend/deleteToken', token);
  }

    return (
      <div className={styles.token}>
        <div className={styles.tokenHead}>
          <div className={styles.tokenTitle}>
            <div className={styles.tokenAmount}>{token.amount}</div>
            <div>{token.token}</div>
          </div>
          <div className="d-flex">
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
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={deleteToken}
          >
            Del
          </button>
        </div>
      </div>
    );
}
