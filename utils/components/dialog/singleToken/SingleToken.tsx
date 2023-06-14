import styles from './singletoken.module.scss';
import { setToast } from '@/utils/store/toast';
import { useState } from 'react';
import { postCall } from '@/utils/ts/api-base';
import SwapForm from '../swap-form/Swap-Form';
import AddForm from '../add-form/Add-Form';
import { LowerCTrim } from '@/utils/ts/pipe';
import { IToken } from '@/utils/types/wallet';
import { useSession } from 'next-auth/react';
import { connect } from 'react-redux';
import { storeReducer } from '@/utils/types/store';

function SingleToken({ setToast, setOpenEvent }: {setToast?:any, setOpenEvent: (isOpen?: boolean) => void}) {
  const { data: session } = useSession();

  const [actionType, setActionType] = useState('add');
  const [tokenFromObject, setTokenFromObject] = useState<IToken>();

  const handleActionTypeChange = (event: any) => {
    setActionType(event.target.value);
  };

  function setTokenFrom(token: IToken) {
    setTokenFromObject(token);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (
      formBaseIsValid(event) &&
      formSwapIsValid(event) &&
      formDecentralisedIsValid(event) &&
      formCentralisedIsValid(event) &&
      formSwapAmountIsValid(event)
    ) {
      const response = await postCall('/api/tokens/addToken', {
        authorId: session?.user.id,
        action: LowerCTrim(event.target.actionType?.value),
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
          locationApp:
            LowerCTrim(event.target.locationApplication?.value) || '',
          locationType: LowerCTrim(event.target.locationType?.value) || '',
        },
      });

      if (response?.status === 200) {
        setOpenEvent(false);
        setToast(response.message, 'alert-success');
      } else {
        setToast(response?.message || 'Error', 'bg-red-500');
      }
    } else {
      setToast('Please verify all fields', 'bg-red-500');
    }
  };

  function formBaseIsValid(event: any): boolean {
    return (
      session?.user.id &&
      event.target.actionType?.value &&
      event.target.tokenTo?.value &&
      event.target.amountTo?.value
    );
  }

  function formSwapIsValid(event: any): boolean {
    return (
      (event.target.actionType?.value === 'swap' &&
        tokenFromObject?.token &&
        tokenFromObject?.locationType &&
        event.target.amountFrom?.value) ||
      event.target.actionType?.value !== 'swap'
    );
  }

  function formSwapAmountIsValid(event: any): boolean {
    return (
      (tokenFromObject?.amount || 0) >= event.target.amountFrom?.value ||
      event.target.actionType?.value !== 'swap'
    );
  }

  function formDecentralisedIsValid(event: any): boolean {
    return (
      (event.target.locationType?.value === 'decentralised' &&
        event.target.locationBlockchain?.value &&
        event.target.locationApplication?.value) ||
      event.target.locationType?.value !== 'decentralised'
    );
  }

  function formCentralisedIsValid(event: any): boolean {
    return (
      (event.target.locationType?.value === 'centralised' &&
        event.target.locationApplication?.value) ||
      event.target.locationType?.value !== 'centralised'
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Add token to your wallet</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-2">
          <div className="input-group">
            <select
              className="select select-bordered"
              aria-label="Action type"
              name="actionType"
              onChange={handleActionTypeChange}
              value={actionType}
            >
              <option disabled>Selecting action type</option>
              <option value="add">ADD</option>
              <option value="swap">SWAP</option>
            </select>
          </div>
        </div>
        {actionType === 'add' ? (
          <AddForm />
        ) : (
          <SwapForm
            setTokenFromEvent={(e: any) => {
              setTokenFrom(e);
            }}
          />
        )}
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary ">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

const mapToast = (state: storeReducer) => ({ ...state.toastReducer });

export default connect(mapToast, { setToast })(SingleToken);
