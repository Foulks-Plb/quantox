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
            setOptions(tk.coins.slice(0, 5));
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
    <div>
      <input
        autoComplete="off"
        className="form-control"
        type="text"
        name="tokenTo"
        placeholder="token name"
        list="tokensTo"
        onChange={(event) => tokenOnChange(event)}
      ></input>
      <datalist id="tokensTo">
        {options.map((item: any, i: number) => (
          <div key={i}>
            <option value={item.api_symbol}>{item.name}</option>
          </div>
        ))}
      </datalist>
      <input
        autoComplete="off"
        className="form-control"
        type="number"
        step="any"
        min="0"
        placeholder="token amount"
        name="amountTo"
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
            autoComplete="off"
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
        autoComplete="off"
        className="form-control"
        type="text"
        name="locationApplication"
        placeholder="Choose aplication"
      ></input>
    </div>
  );
}
