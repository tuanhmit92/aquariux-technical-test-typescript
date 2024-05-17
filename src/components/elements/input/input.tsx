import React from "react";

import { InputProps } from "./types";

import "./input.scss";

const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  callback,
  required = true,
}: InputProps) => {
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode == 13) {
      callback();
    }
  };
  return (
    <div className="input">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyUp}
        required={required}
      />
      {label && <label>{label}</label>}
    </div>
  );
};
export default Input;
