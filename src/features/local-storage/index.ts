import { useCallback, useState } from "react";

type LocalStorageCodec<T> = {
  encode: (value: T) => string;
  decode: (value: string) => T;
};

type UseLocalStorageOption<T> = LocalStorageCodec<T>;

export const useLocalStorage = <T>(key: string, { encode, decode }: UseLocalStorageOption<T>) => {
  const [value, setValue] = useState<T | undefined>(() => {
    if (typeof localStorage === "undefined") return;
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue ? decode(localStorageValue) : undefined;
  });

  const update = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, encode(newValue));
      setValue(newValue);
    },
    [key, encode],
  );

  return {
    value,
    setValue: update,
  } as const;
};

export const booleanCodec: LocalStorageCodec<boolean> = {
  encode: String,
  decode: (v) => (v === "false" ? false : Boolean(v)),
};

export const jsonCodec: LocalStorageCodec<object> = {
  encode: JSON.stringify,
  decode: JSON.parse,
};
