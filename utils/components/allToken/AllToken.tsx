import { Token } from '@/utils/types/wallet';
import styles from './AllToken.module.scss';
import TokenDisplay from './tokenDisplay/TokenDisplay';

export default function AllToken({ tokens }: any) {

  return (
    <div className={styles.allTokens}>
      <div className={styles.header}>
        <div className={styles.title}>All tokens</div>
      </div>
      <div className={styles.body}>
        {tokens?.map(function (token: Token, i: number) {
          return <TokenDisplay key={i} token={token} />;
        })}
      </div>
    </div>
  );
}