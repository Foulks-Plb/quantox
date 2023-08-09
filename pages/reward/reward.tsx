import { useEffect, useState } from 'react';
import { IPool, StorePoolProps } from '@/utils/types/wallet';
import styles from './reward.module.scss';
import InfoCard from '@/utils/components/card/infoCard/InfoCard';
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
    </div>
  );
};

export default Page;
