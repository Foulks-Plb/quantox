import { Token } from '@/utils/types/wallet';
import styles from './AllToken.module.scss';

export default function AllToken({ tokens }: any) {
  return (
    <div className={styles.allTokens}>
      <div className={styles.header}>
        <div className={styles.title}>All tokens</div>
      </div>
      <div className={styles.body}>
        {tokens.map(function (token: Token, i: number) {
          return <div key={i} className={styles.token}>
              <div className={styles.tokenHead}>
                <div className={styles.tokenTitle}>
                  <div className={styles.tokenAmount}>{token.amount}</div>
                  <div>{token.token}</div> 
                </div>
                <div className='d-flex'>
                  {token.locationBlockchain && <div className={styles.tokenBlockchain}>{token.locationBlockchain}</div> }
                  {token.locationApp && <div>{token.locationApp}</div>}
                </div>
                
              </div>
              <div className={styles.tokenBody}>
                <div className={styles.tokenCurrency}>$</div>
                <div>{token.value}</div>
              </div>
          </div>;
        })}
      </div>
    </div>
  );
}
