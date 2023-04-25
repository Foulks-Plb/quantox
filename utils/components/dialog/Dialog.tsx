import { useState } from 'react';
import styles from './dialog.module.scss';
import { postCall } from '@/utils/ts/api';
import { authorId } from '@/utils/constant';

export default function Dialog({ emitCloseDialog }: any) {
  const [isDecentralisedForm, setIsDecentralisedForm] = useState(true);

  function closeDialog() {
    emitCloseDialog();
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    postCall('/api/addHistory', {
      authorId: authorId,
      action: event.target.actionType.value.toLowerCase(),
      token: event.target.token.value.toLowerCase(),
      amount: parseFloat(event.target.amount.value),
      locationBlockchain: event.target.locationBlockchain?.value.toLowerCase() || '' ,
      locationApp: event.target.locationApplication.value.toLowerCase(),
      locationType: event.target.locationType.value.toLowerCase(),
      processAt: new Date().toISOString(),
    })
  };

  function setLocationType(value: string) {
    if (value === 'decentralised') {
      setIsDecentralisedForm(true);
    } else {
      setIsDecentralisedForm(false);
    }
  }

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
          >
            <option value="add">ADD</option>
            <option value="swap">SWAP</option>
          </select>
          <input
            className="form-control"
            type="text"
            name="token"
            placeholder="token name"
          ></input>
          <select
            className="form-select"
            aria-label="Choose environment"
            name="locationType"
            onChange={(e) => {
              setLocationType(e.target.value);
            }}
          >
            <option value="decentralised">Decentralised</option>
            <option value="centralised">Centralised</option>
          </select>

          {isDecentralisedForm ? (
            <div>
              <input
                className="form-control"
                type="text"
                name="locationBlockchain"
                placeholder="Choose blockchain"
              ></input>
            </div>
          ) : (
            <div></div>
          )}
          <input
            className="form-control"
            type="text"
            name="locationApplication"
            placeholder="Choose aplication"
          ></input>
          <input
            className="form-control"
            type="number"
            step="any"
            min="0"
            placeholder="token amount"
            name="amount"
          ></input>
          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
