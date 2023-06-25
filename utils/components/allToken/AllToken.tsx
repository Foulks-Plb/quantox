import { IToken } from '@/utils/types/wallet';
import styles from './alltoken.module.scss';
import TokenDisplay from './tokenDisplay/TokenDisplay';

export default function AllToken({ tokens }: any) {

  return (
    <div className={styles.allTokens}>
      <div className={styles.header}>
        <div className={styles.title}>All tokens</div>
      </div>
      <div className={styles.body}>
        {tokens?.tokens.map(function (token: IToken, i: number) {
          return <TokenDisplay key={i} token={token} />;
        })}
      </div>
    </div>
  );
}
