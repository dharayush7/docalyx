import { createContext } from "react";

export const AuthContext = createContext<{
  userName: string | null;
  setUserName: (val: string) => void;
}>({
  userName: null,
  setUserName: () => {},
});
