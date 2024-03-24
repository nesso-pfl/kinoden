import { useLocalStorage, booleanCodec } from "../local-storage";

const localStorageKey = "kinoden-pfl:studyMode";

export const useStudyMode = () => {
  const { value: studyMode = false, setValue: setStudyMode } = useLocalStorage<boolean>(localStorageKey, {
    ...booleanCodec,
  });

  return {
    studyMode,
    setStudyMode,
  };
};
