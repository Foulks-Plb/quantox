import { useEffect, useState } from 'react';
import PieChart from '../../utils/components/chart/pieChart/PieChart';
import { IPool, StorePoolProps } from '@/utils/types/wallet';
import { getPool } from '@/utils/store/pool';
import { connect } from 'react-redux';
import { OptionPieChart } from '@/utils/types/chart';
import styles from './pool.module.scss';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
import ReloadCard from '@/utils/components/card/reloadCard/ReloadCard';
import AllToken from '@/utils/components/allToken/AllToken';
import { colorsPieChart } from '@/utils/constant';
import { storeReducer } from '@/utils/types/store';
import PoolDisplay from '@/utils/components/allPool/poolDisplay/PoolDisplay';

const Page = ({ pool, getPool }: StorePoolProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
      if (getPool) getPool();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    console.log(pool);
  }, [pool]);

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
