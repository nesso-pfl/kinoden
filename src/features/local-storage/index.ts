import { useCallback, useEffect, useState } from "react";

type UseLocalStorageOption<T> = {
  encode: (value: T) => string;
  decode: (value: string) => T;
};

export const useLocalStorage = <T>(key: string, { encode, decode }: UseLocalStorageOption<T>) => {
  const [value, setValue] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const localStorageValue = window.localStorage.getItem(key);
    setValue(localStorageValue ? decode(localStorageValue) : undefined);
    setIsLoading(false);
  }, [key, decode]);

  const update = useCallback(
    (newValue: T) => {
      if (typeof window === "undefined") return;

      localStorage.setItem(key, encode(newValue));
      setValue(newValue);
    },
    [key, encode],
  );

  return {
    value,
    setValue: update,
    isLoading,
  } as const;
};

export const jsonCodec = {
  encode: JSON.stringify,
  decode: JSON.parse,
};
