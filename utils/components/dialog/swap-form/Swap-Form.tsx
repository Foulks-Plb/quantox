import { getResultsWithName } from '@/utils/ts/api-coingecko';
import { IToken } from '@/utils/types/wallet';
import { useState } from 'react';
import FormFinderToken from '../../formFinderToken/FormFinderToken';

export default function SwapForm({
  setTokenFromEvent,
}: {
  setTokenFromEvent: (searchObject: any) => void;
}) {
  const [isDecentralisedForm, setIsDecentralisedForm] = useState(true);

  const [searchObject, setSearchObject] = useState<IToken>();
  const [errorAmountFrom, setErrorAmountFrom] = useState<string>('');

  const [options, setOptions] = useState([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

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

  function setLocationType(value: string) {
    if (value === 'decentralised') {
      setIsDecentralisedForm(true);
    } else {
      setIsDecentralisedForm(false);
    }
  }

  function onChangeAmountFrom(event: any) {
    verifyAmountFrom(Number(event?.target?.value), searchObject?.amount);
  }

 function verifyAmountFrom(amountSet: number, amountTotal?: number) {
    if (amountTotal) {
      if (amountSet > amountTotal) {
        setErrorAmountFrom(
          'The value is greater than your amount ' + amountTotal,
        );
      } else {
        setErrorAmountFrom('');
      }
    } else {
      setErrorAmountFrom('First select a token');
    }
  }

  return (
    <div className="form-control">
      <FormFinderToken
        setTokenFromEvent={(e: any) => {
          setSearchObject(e);
          setTokenFromEvent(e);
        }}
      />
      <label className="input-group input-group-sm mt-2">
        <span>Amount from</span>
        <input
          onChange={onChangeAmountFrom}
          type="number"
          step="any"
          min={0}
          autoComplete="off"
          name="amountFrom"
          placeholder="0.1"
          className="input input-bordered input-sm"
          required
        />
      </label>
      {errorAmountFrom && <div className="text-red-600">{errorAmountFrom}</div>}
      <div className="divider">↓↓↓↓↓↓↓↓</div>
      <label className="input-group input-group-sm">
        <span>Token to</span>
        <input
          autoComplete="off"
          name="tokenTo"
          type="text"
          placeholder="bitcoin"
          className="input input-bordered input-sm"
          onChange={(event) => tokenOnChange(event)}
          list="tokensTo"
          required
        />
        <datalist id="tokensTo">
          {options?.map((item: any, i: number) => (
            <div key={i}>
              <option value={item.api_symbol}>{item.name}</option>
            </div>
          ))}
        </datalist>
      </label>
      <label className="input-group input-group-sm mt-2">
        <span>Amount to</span>
        <input
          autoComplete="off"
          name="amountTo"
          type="text"
          placeholder="0.01"
          className="input input-bordered input-sm"
          required
        />
      </label>
      <div className="divider"></div>
      <div className="input-group input-group-sm">
        <select
          className="select select-bordered select-sm"
          aria-label="Action type"
          name="locationType"
          onChange={(e) => {
            setLocationType(e.target.value);
          }}
          defaultValue={'decentralised'}
        >
          <option disabled>Select location type</option>
          <option value="decentralised">Decentralised</option>
          <option value="centralised">Centralised</option>
        </select>
      </div>
      {isDecentralisedForm ? (
        <div className="mt-2">
          <label className="input-group input-group-sm">
            <span>Blockchain</span>
            <input
              autoComplete="off"
              name="locationBlockchain"
              type="text"
              placeholder="Bitcoin"
              className="input input-bordered input-sm"
              required
            />
          </label>
        </div>
      ) : (
        <div></div>
      )}
      <label className="input-group input-group-sm mt-2 mb-2">
        <span>Application</span>
        <input
          autoComplete="off"
          name="locationApplication"
          type="text"
          placeholder="wallet"
          className="input input-bordered input-sm"
          required
        />
      </label>
    </div>
  );
}
