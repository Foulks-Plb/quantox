import { useEffect, useState } from 'react';
import { getCall } from '@/utils/ts/api-base';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
import styles from './reward.module.scss';

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (isMounted) {
      getReward();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  async function getReward() {
    const response = await getCall('/api/rewards');
    setRewards(response);
  }

  return (
    <div className='padding-l'>
      <div className="flex">
        <InfoCard title="Total pool" value={1432.32} />
        <InfoCard title="APR total" value={12.20} />
      </div>
      <div>All rewards</div>
      <div className={styles.allReward}>
      {rewards?.map(function (reward: any, i: number) {
        return (
          <div key={i} >
            <div>{reward.token}</div>
            <div>{reward.amount}</div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Page;
