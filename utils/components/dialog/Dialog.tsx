import styles from './dialog.module.scss';
import { useState } from 'react';
import { postCall } from '@/utils/ts/api-base';
import SwapForm from './swap-form/Swap-Form';
import AddForm from './add-form/Add-Form';
import { LowerCTrim } from '@/utils/ts/pipe';
import { Token } from '@/utils/types/wallet';
import { useSession } from 'next-auth/react';

export default function Dialog() {
  const { data: session } = useSession();

  const [actionType, setActionType] = useState('add');
  const [tokenFromObject, setTokenFromObject] = useState<Token>();

  const handleActionTypeChange = (event: any) => {
    setActionType(event.target.value);
  };

  function setTokenFrom(token: Token) {
    setTokenFromObject(token);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    postCall('/api/addHistory', {
      authorId: session?.user.id,
      action: LowerCTrim(event.target.actionType.value),
      from: {
        token: tokenFromObject?.token || '',
        amount: parseFloat(event.target.amountFrom?.value) || 0,
        locationBlockchain: tokenFromObject?.locationBlockchain || '',
        locationApp: tokenFromObject?.locationApp || '',
        locationType: tokenFromObject?.locationType || '',
      },
      to: {
        token: event.target.tokenTo?.value || '',
        amount: parseFloat(event.target.amountTo?.value) || 0,
        locationBlockchain: LowerCTrim(
          event.target.locationBlockchain?.value || '',
        ),
        locationApp: LowerCTrim(event.target.locationApplication?.value) || '',
        locationType: LowerCTrim(event.target.locationType?.value) || '',
      },
      processAt: new Date(),
    });
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add tokens to your wallet</h3>
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
            {actionType === 'add' ? (
              <AddForm />
            ) : (
              <SwapForm
                setTokenFrom={(e: any) => {
                  setTokenFrom(e);
                }}
              />
            )}
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
