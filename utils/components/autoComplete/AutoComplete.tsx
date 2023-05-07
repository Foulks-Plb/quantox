import React, { useEffect, useState } from 'react';
import styles from './autocomplete.module.scss';

const AutoComplete = ({ searchValue, options, setSearch }: any) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    let filteredOptions = options.filter(
      (option: any) =>
        option.token.toLowerCase().indexOf(searchValue.toLowerCase()) > -1,
    );
    filteredOptions = filteredOptions.slice(0, 3)
    setFilteredOptions(filteredOptions);
  }, [searchValue]);

  function handleOptionClick(option: any) {
    setSearch(option)
  }

  return (
    <div>
      <div className={styles.tooltip}>
        {filteredOptions.map((option: any, i) => (
          <div
            className={styles.tooltiptext}
            key={i}
            onClick={(e) => {
              handleOptionClick(option);
            }}
          >
            <div className={styles.tooltipToken}>{option.token}</div>
            <div className={styles.tooltipLocation}>
              {option.locationBlockchain +
                ' - ' +
                option.locationApp +
                ' - ' +
                option.locationType}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoComplete;
