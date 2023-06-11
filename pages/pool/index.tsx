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
import { fixed2 } from '@/utils/ts/pipe';

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
    <div>
      <div>liquidity pool</div>

      {pool?.pools?.map(function (pool: IPool, i: number) {
        return (
          <div key={i} className="stats">
            <div className="stat place-items-center">
              <div className="stat-title">{pool.tokenA}</div>
              <div className="stat-value">{pool.valueNowA}$</div>
              <div className="stat-desc">{pool.amountNowA}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Total</div>
              <div className="stat-value text-secondary">{fixed2((pool?.valueNowA || 0) + (pool?.valueNowB || 0))}$</div>
              <div className="stat-desc text-secondary">-{pool.impermanentLoss}%</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">{pool.tokenB}</div>
              <div className="stat-value">{pool.valueNowB}$</div>
              <div className="stat-desc">{pool.amountNowB}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapPool = (state: storeReducer) => ({ ...state.poolReducer });

export default connect(mapPool, { getPool })(Page);
