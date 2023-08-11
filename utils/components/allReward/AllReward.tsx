import { IReward } from '@/utils/types/wallet';
import styles from './allreward.module.scss';
import { useState } from 'react';

export default function AllReward({ rewards }: { rewards?: IReward[] }) {
  const [selectedRewards, setSelectedRewards] = useState<any[]>([]);

  const toggleAccordion = (index: any) => {
    if (selectedRewards.includes(index)) {
      setSelectedRewards(selectedRewards.filter((i) => i !== index));
    } else {
      setSelectedRewards([...selectedRewards, index]);
    }
  };

  return (
    <div className={styles.allRewards}>
      <div className={styles.header}>
        <div className={styles.title}>All reward</div>
      </div>
      <div className={styles.body}>
        {rewards?.map((reward: IReward, i: number) => (
          <div key={i} className="collapse collapse-arrow bg-base-200 mb-2">
            <input
              type="radio"
              name={'my-accordion-' + i}
              className="cursor-pointer"
              checked={selectedRewards.includes(i)}
              onClick={() => toggleAccordion(i)}
            />
            <div className="collapse-title text-xl font-medium">
              <div className="flex">
                <div>{reward.amount + ' ' + reward.token}</div>
              </div>
            </div>
            <div className="collapse-content">
            <div>{ '+' + reward.value + '$'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
