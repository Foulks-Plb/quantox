import { deleteToken } from '@/utils/ts/api-base';
import styles from './tokendisplay.module.scss';

export default function TokenDisplay({ token }: any) {
  function deleteT() {
    deleteToken('/api/deleteToken', token);
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
