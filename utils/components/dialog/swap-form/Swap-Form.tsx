import { getWallet } from '@/utils/store/wallet';
import { getResultsWithName } from '@/utils/ts/api-coingecko';
import { StoreWalletProps, Token } from '@/utils/types/wallet';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AutoComplete from '../../autoComplete/AutoComplete';

function SwapForm({ wallet, isLoading, error, getWallet, setTokenFrom }: any) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDecentralisedForm, setIsDecentralisedForm] = useState(true);

  const [searchValue, setSearchValue] = useState<string>('');
  const [inSearch, setInSearch] = useState(false);
  const [searchObject, setSearchObject] = useState<Token>();

  const [options, setOptions] = useState([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (isMounted) {
      if (getWallet) getWallet();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

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

  function handleTokenSelection(event: any) {
    setSearchValue(event?.target?.value);
    if (event?.target?.value !== searchObject?.token && searchObject) {
      setSearchObject(undefined);
      setTokenFrom(undefined);
    }
  }

  function setOptionChoose(searchObject: any) {
    setSearchObject(searchObject);
    setSearchValue(searchObject.token);
    setTokenFrom(searchObject);
  }

  return (
    <div className="form-control">
      <label className="input-group input-group-sm mb-2">
        <span>Token from</span>
        <input
          autoComplete="off"
          name="tokenFrom"
          type="text"
          placeholder="ethereum"
          className="input input-bordered input-sm"
          required
          value={searchValue}
          onChange={handleTokenSelection}
          onFocus={() => {
            setInSearch(true);
          }}
          onBlur={() => {
            setTimeout(() => setInSearch(false), 400);
          }}
        />
      </label>
      {inSearch && (
        <AutoComplete
          searchValue={searchValue}
          options={wallet?.tokens}
          setSearch={(e: any) => {
            setOptionChoose(e);
          }}
        />
      )}
      <div className="flex">
        <div>{searchObject?.locationBlockchain}</div>
        <div className="px-2">{searchObject?.locationApp}</div>
        <div>{searchObject?.locationType}</div>
      </div>
      <label className="input-group input-group-sm mb-2">
        <span>Amount from</span>
        <input
          autoComplete="off"
          name="amountFrom"
          type="text"
          placeholder="0.1"
          className="input input-bordered input-sm"
          required
        />
      </label>

      <div className="divider">↓↓↓↓↓↓↓↓</div>

      <label className="input-group input-group-sm mb-2">
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
      <label className="input-group input-group-sm mb-2">
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
        <div className="mb-2">
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
      <label className="input-group input-group-sm mb-2">
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

const mapWallet = (state: StoreWalletProps) => ({
  wallet: state.wallet,
  isLoading: state.isLoading,
  error: state.error,
});

export default connect(mapWallet, { getWallet })(SwapForm);
