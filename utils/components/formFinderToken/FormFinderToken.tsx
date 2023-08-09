import { useEffect, useState } from 'react';
import AutoComplete from '../autoComplete/AutoComplete';
import { IToken, IWallet } from '@/utils/types/wallet';
import { getWallet } from '@/utils/store/wallet';
import { connect } from 'react-redux';
import { storeReducer } from '@/utils/types/store';

function FormFinderToken({
  title = 'Token from',
  wallet,
  getWallet,
  setTokenFromEvent,
}: {
  title?: string,
  wallet?: IWallet;
  getWallet?: (force?: boolean) => void;
  setTokenFromEvent: (searchObject: any) => void;
}) {

  const [isMounted, setIsMounted] = useState(false);

  const [searchObject, setSearchObject] = useState<IToken>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [inSearch, setInSearch] = useState(false);

  useEffect(() => {
    if (isMounted) {
      if (getWallet) getWallet();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  function setOptionChoose(searchObject: any) {
    setSearchObject(searchObject);
    setSearchValue(searchObject.token);
    setTokenFromEvent(searchObject);
  }

  function handleTokenSelection(event: any) {
    setSearchValue(event?.target?.value);
    if (event?.target?.value !== searchObject?.token && searchObject) {
      setSearchObject(undefined);
      setTokenFromEvent(undefined);
    }
  }

  return (
    <div>
      <label className="input-group input-group-sm">
        <span>{title}</span>
        <input
          autoComplete="off"
          name="tokenFrom"
          type="text"
          placeholder="curve"
          className="input input-bordered input-sm"
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
    </div>
  );
}

const mapWallet = (state: storeReducer) => ({ ...state.walletReducer });

export default connect(mapWallet, { getWallet })(FormFinderToken);
