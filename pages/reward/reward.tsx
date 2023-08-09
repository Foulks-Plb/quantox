import { useEffect, useState } from 'react';
import { IPool, StorePoolProps } from '@/utils/types/wallet';
import { getPool } from '@/utils/store/pool';
import { connect } from 'react-redux';;
import styles from './reward.module.scss';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
import { storeReducer } from '@/utils/types/store';
import PoolDisplay from '@/utils/components/allPool/poolDisplay/PoolDisplay';

const Page = ({ pool, getPool }: StorePoolProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // if (isMounted) {
    //   if (getPool) getPool();
    // } else {
    //   setIsMounted(true);
    // }
  }, [isMounted]);

  return (
    <div className='padding-l'>
      <InfoCard title="Total pool" value={pool?.total} />
      <div>All pools</div>
      <div className={styles.allPool}>
      {pool?.pools?.map(function (pool: IPool, i: number) {
        return (
          <div key={i} >
            <PoolDisplay pool={pool} />
          </div>
        );
      })}
      </div>
    </div>
  );
};

const mapPool = (state: storeReducer) => ({ ...state.poolReducer });

export default connect(mapPool, { getPool })(Page);
