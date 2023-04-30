import { getWallet } from '@/utils/store/wallet';
import { getResultsWithName } from '@/utils/ts/api-coingecko';
import { StoreWalletProps, Token } from '@/utils/types/wallet';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AutoComplete from '../../autoComplete/AutoComplete';

function SwapForm({ wallet, isLoading, error, getWallet }: StoreWalletProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDecentralisedForm, setIsDecentralisedForm] = useState(true);

  const [searchValue, setSearchValue] = useState<string>('')
  const [inSearch, setInSearch] = useState(false);

  const [options, setOptions] = useState([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  useEffect(() => {
      if (isMounted) {
        if (getWallet) getWallet()
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

  function handleTokenSelection(event: any) {
    setSearchValue(event?.target?.value);
  }

  function setOptionChoose(e: any) {
    setSearchValue(e.token);
  }

  return (
    <div>
      <input
        autoComplete="off"
        className="form-control"
        type="text"
        name="tokenFrom"
        placeholder="token name from"
        list="tokensFrom"
        value={searchValue}
        onChange={handleTokenSelection}
        onFocus={() => {setInSearch(true)}}
        onBlur={() => {setTimeout(() => setInSearch(false), 400)}}
      ></input>
      {inSearch && <AutoComplete searchValue={searchValue} options={wallet?.tokens} setSearch={(e: any)=> {setOptionChoose(e)}}/> }
      <input
        autoComplete="off"
        className="form-control"
        type="number"
        step="any"
        min="0"
        placeholder="token amount from"
        name="amountFrom"
      ></input>

      <div className='text-center text-primary'>↓↓↓↓↓↓↓↓</div>
      
      <input
        autoComplete="off"
        className="form-control"
        type="text"
        name="tokenTo"
        placeholder="token name to"
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
        placeholder="token amount to"
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

const mapWallet = (state: StoreWalletProps) => ({
  wallet: state.wallet,
  isLoading: state.isLoading,
  error: state.error,
});

export default connect(mapWallet, { getWallet })(SwapForm);
