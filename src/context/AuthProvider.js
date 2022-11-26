import { createContext} from "react";

export const AuthContext = createContext({
    userContext: {},
    setUserContext: () => {}
});
