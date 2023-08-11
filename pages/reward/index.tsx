import { useEffect, useState } from 'react';
import { getCall } from '@/utils/ts/api-base';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
import styles from './reward.module.scss';
import AllReward from '@/utils/components/allReward/AllReward';
import { IWalletReward, StoreWalletProps } from '@/utils/types/wallet';
import { storeReducer } from '@/utils/types/store';
import { connect } from 'react-redux';
import { getWallet } from '@/utils/store/wallet';
import { fixed2, fixed4 } from '@/utils/ts/pipe';

const Page = ({ wallet, getWallet }: StoreWalletProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [rewards, setRewards] = useState<IWalletReward>();
  const [aprTotal, setAprTotal] = useState<any>();

  useEffect(() => {
    if (isMounted) {
      getReward();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    if (rewards && wallet) {
      const apr = (rewards?.total || 0) / (wallet?.total || 0);
      if (apr < 0.01) {
        setAprTotal('< 0.01');
      } else {
        setAprTotal(fixed2((rewards?.total || 0) / (wallet?.total || 0)));
      }
      
    }
  }, [rewards, wallet]);

  

  async function getReward() {
    if (getWallet) getWallet();
    const response = await getCall('/api/rewards');
    setRewards(response);
  }

  return (
    <div className='padding-l'>
      <div className="flex">
        <InfoCard title="Total pool" value={rewards?.total}  symbol='$'/>
        <InfoCard title="APR total" value={aprTotal} color='#FFD717' symbol='%'/>
      </div>
      <AllReward rewards={rewards?.rewards}/>
    </div>
  );
};

const mapWallet = (state: storeReducer) => ({ ...state.walletReducer });
export default connect(mapWallet, { getWallet })(Page);
