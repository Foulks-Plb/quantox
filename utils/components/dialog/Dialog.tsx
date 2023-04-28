import styles from './dialog.module.scss';
import { useState } from 'react';
import { postCall } from '@/utils/ts/api-base';
import { authorId } from '@/utils/constant';
import SwapForm from './swap-form/Swap-Form';
import AddForm from './add-form/Add-Form';
import { LowerCTrim } from '@/utils/ts/pipe';


export default function Dialog({ emitCloseDialog }: any) {
  const [actionType, setActionType] = useState('add');

  const handleActionTypeChange = (event: any) => {
    setActionType(event.target.value);
  };

  function closeDialog() {
    emitCloseDialog();
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    postCall('/api/addHistory', {
      authorId: authorId,
      action: LowerCTrim(event.target.actionType.value),
      from: {
        token: event.target.tokenFrom?.value || '',
        amount: parseFloat(event.target.amountFrom?.value) || 0,
        locationBlockchain: 'ethereum',
        locationApp: 'aave',
        locationType: 'decentralised',
      },
      to: {
        token: event.target.tokenTo?.value || '',
        amount: parseFloat(event.target.amountTo?.value) || 0,
        locationBlockchain: LowerCTrim(event.target.locationBlockchain?.value || ''),
        locationApp: LowerCTrim(event.target.locationApplication?.value) || '',
        locationType: LowerCTrim(event.target.locationType?.value) || '',
      },
      processAt: new Date(),
    });
    closeDialog();
  };

  return (
    <div className={styles.allView}>
      <div className={styles.dialog}>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={closeDialog}
        ></button>
        <form onSubmit={handleSubmit}>
          <select
            className="form-select"
            aria-label="Action type"
            name="actionType"
            onChange={handleActionTypeChange}
            value={actionType}
          >
            <option value="add">ADD</option>
            <option value="swap">SWAP</option>
          </select>
          {actionType === 'add' ? <AddForm /> : <SwapForm />}
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
