import { supabase } from "../supabase";
import useSWRImmutable from "swr/immutable";

const getRelics = async () => {
  const [maskRelics, fossilRelics, treasureRelics, bookRelics, statueRelics, necklaceRelics] = await Promise.all([
    supabase.from("mask_relics").select("*"),
    supabase.from("fossil_relics").select("*"),
    supabase.from("tresure_relics").select("*"),
    supabase.from("book_relics").select("*"),
    supabase.from("statue_relics").select("*"),
    supabase.from("necklace_relics").select("*"),
  ]);

  return {
    maskRelics: maskRelics.data ?? [],
    fossilRelics: fossilRelics.data ?? [],
    treasureRelics: treasureRelics.data ?? [],
    bookRelics: bookRelics.data ?? [],
    statueRelics: statueRelics.data ?? [],
    necklaceRelics: necklaceRelics.data ?? [],
  };
};

export const useGetRelics = () => {
  return useSWRImmutable("relics", getRelics);
};
