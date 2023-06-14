import { getResultsWithName } from '@/utils/ts/api-coingecko';
import { useState } from 'react';

export default function AddForm() {
  const [isDecentralisedForm, setIsDecentralisedForm] = useState(true);

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

  return (
    <div className="form-control">
      <label className="input-group input-group-sm mb-2">
        <span>Token</span>
        <input
          autoComplete="off"
          name="tokenTo"
          type="text"
          placeholder="ethereum"
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
      <label className="input-group input-group-sm mb-2">
        <span>Amount</span>
        <input
          autoComplete="off"
          name="amountTo"
          type="text"
          placeholder="0.1"
          className="input input-bordered input-sm"
          required 
        />
      </label>
      <div className="divider"></div>
      <div className="input-group input-group-sm mb-2">
        <select
          className="select select-bordered select-sm"
          aria-label="Action type"
          name="locationType"
          onChange={(e) => {
            setLocationType(e.target.value);
          }}
          defaultValue={'decentralised'}
        >
          <option disabled>
            Select location type
          </option>
          <option value="decentralised">Decentralised</option>
          <option value="centralised">Centralised</option>
        </select>
      </div>

      {isDecentralisedForm ? (
        <div className='mb-2'>
          <label className="input-group input-group-sm">
            <span>Blockchain</span>
            <input
              autoComplete="off"
              name="locationBlockchain"
              type="text"
              placeholder="Ethereum"
              className="input input-bordered input-sm"
              required
            />
          </label>
        </div>
      ) : (
        <div></div>
      )}
      <label className="input-group input-group-sm mb-2">
        <span>Application</span>
        <input
          autoComplete="off"
          name="locationApplication"
          type="text"
          placeholder="Aave"
          className="input input-bordered input-sm"
          required
        />
      </label>
    </div>
  );
}
