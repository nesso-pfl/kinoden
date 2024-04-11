import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UsernameStore = {
  username: string | undefined;
  createUsername: (username: string) => unknown;
};

export const useUsernameStore = create<UsernameStore>()(
  persist(
    (set) => ({
      username: undefined,
      createUsername: (username: string) => set({ username }),
    }),
    {
      name: "username",
    },
  ),
);
