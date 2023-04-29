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
            <div className='d-flex'>
                {/* <img></img> */}
                <div>{token.token}</div>
                <div>{'$' + token.value}</div>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
}
