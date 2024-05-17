import React, { useEffect, useState } from "react";

import Input from "../elements/input/input";
import { SearchProps } from "./types";

import iconSearch from "../../assets/images/icons/icon-search-white.svg";
import iconClear from "../../assets/images/icons/icon-clear.png";
import "./search.scss";

const Search = ({
  keySearch,
  setKeySearch,
  callbackKeySearch,
  callback,
  clear,
}: SearchProps) => {
  const [debouncedKeySearch, setDebouncedKeySearch] = useState<string>("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setKeySearch(e.currentTarget.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedKeySearch(keySearch);
    }, 300);
    return () => clearTimeout(delayInputTimeoutId);
  }, [keySearch, 300]);

  useEffect(() => {
    callbackKeySearch(debouncedKeySearch);
  }, [debouncedKeySearch]);

  return (
    <div className="search">
      <Input
        label="City / Country"
        type="text"
        value={keySearch}
        onChange={onChange}
        callback={callback}
      />
      <div className="search__icon-search" onClick={callback}>
        <img src={iconSearch} />
      </div>
      <div className="search__icon-search" onClick={clear}>
        <img src={iconClear} />
      </div>
    </div>
  );
};
export default Search;
