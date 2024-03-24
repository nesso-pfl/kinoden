import { useLocalStorage } from "../local-storage";

const localStorageKey = "kinoden-pfl:studyMode";

export const useStudyMode = () => {
  const { value: studyMode = false, setValue: setStudyMode } = useLocalStorage<boolean>(localStorageKey, {
    encode: String,
    decode: Boolean,
  });

  return {
    studyMode,
    setStudyMode,
  };
};
