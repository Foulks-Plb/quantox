import styles from './poolform.module.scss';
import { setToast } from '@/utils/store/toast';
import { useEffect, useState } from 'react';
import { postCall } from '@/utils/ts/api-base';
import { LowerCTrim } from '@/utils/ts/pipe';
import { Token } from '@/utils/types/wallet';
import { useSession } from 'next-auth/react';
import { connect } from 'react-redux';
import { storeReducer } from '@/utils/types/store';
import { getResultsWithName } from '@/utils/ts/api-coingecko';

function PoolForm({
  setToast,
  setOpenEvent,
}: {
  setToast?: any;
  setOpenEvent: (isOpen?: boolean) => void;
}) {
  const { data: session } = useSession();

  const [options, setOptions] = useState([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const [ratioError, setRatioError] = useState(false);
  const [amountA ,setAmountA] = useState(0);
  const [amountB ,setAmountB] = useState(0);
  const [priceA ,setPriceA] = useState(0);
  const [priceB ,setPriceB] = useState(0);

  useEffect(() => {
    if (amountA && amountB && priceA && priceB) {
      const ratio = (amountA * priceA) / (amountB * priceB);
      if (ratio < 1.05 && ratio > 0.95) {
        setRatioError(false)
      } else {
        setRatioError(true)
      }
    }
  }, [amountA, amountB, priceA, priceB]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(event.target.amountA?.value, event.target.amountB?.value, event.target.priceA?.value, event.target.priceB?.value);
    if (false) {
      const response = await postCall('/api/addHistory', {});
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
  async function tokenOnChange(event: any) {
    const value = event.target.value;

    if (timeoutId) {
      setOptions([]);
      clearTimeout(timeoutId);
    }

    if (value !== '') {
      setTimeoutId(
        setTimeout(() => {
          getResultsWithName(value).then((tk) => {
            setOptions(tk?.coins?.slice(0, 5));
          });
        }, 2000),
      );
    }
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
      <h3 className="text-lg font-bold mb-2">
        Add liquidity pool to your wallet
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-2">
          <label className="input-group input-group-sm mb-2">
            <span>Token A</span>
            <input
              autoComplete="off"
              name="tokenA"
              type="text"
              placeholder="usd-coin"
              className="input input-bordered input-sm"
              onChange={(event) => tokenOnChange(event)}
              list="tokensA"
              required
            />
            <datalist id="tokensA">
              {options?.map((item: any, i: number) => (
                <div key={i}>
                  <option value={item.api_symbol}>{item.name}</option>
                </div>
              ))}
            </datalist>
          </label>
          <label className="input-group input-group-sm mb-2">
            <span>Amount A</span>
            <input
              onChange={(event) => setAmountA(Number(event.target.value))}
              autoComplete="off"
              name="amountA"
              type="number"
              placeholder="100"
              className={`input input-bordered input-sm ${ratioError ? 'input-error' : ''}`}
              required
            />
          </label>
          <label className="input-group input-group-sm mb-2">
            <span>Price A</span>
            <input
              onChange={(event) => setPriceA(Number(event.target.value))}
              autoComplete="off"
              name="priceA"
              type="number"
              placeholder="1"
              className={`input input-bordered input-sm ${ratioError ? 'input-error' : ''}`}
              required
            />
          </label>
          <div className="divider">+</div>
          <label className="input-group input-group-sm mb-2">
            <span>Token B</span>
            <input
              autoComplete="off"
              name="tokenB"
              type="text"
              placeholder="tether"
              className="input input-bordered input-sm"
              onChange={(event) => tokenOnChange(event)}
              list="tokensB"
              required
            />
            <datalist id="tokensB">
              {options?.map((item: any, i: number) => (
                <div key={i}>
                  <option value={item.api_symbol}>{item.name}</option>
                </div>
              ))}
            </datalist>
          </label>
          <label className="input-group input-group-sm mb-2">
            <span>Amount B</span>
            <input
              onChange={(event) => setAmountB(Number(event.target.value))}
              autoComplete="off"
              name="amountB"
              type="number"
              placeholder="100"
              className={`input input-bordered input-sm ${ratioError ? 'input-error' : ''}`}
              required
            />
          </label>
          <label className="input-group input-group-sm mb-2">
            <span>Price B</span>
            <input
              onChange={(event) => setPriceB(Number(event.target.value))}
              autoComplete="off"
              name="priceB"
              type="number"
              placeholder="1"
              className={`input input-bordered input-sm ${ratioError ? 'input-error' : ''}`}
              required
            />
          </label>
          <div className="divider"></div>
        </div>

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

export default connect(mapToast, { setToast })(PoolForm);
