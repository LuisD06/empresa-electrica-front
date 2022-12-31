import { createContext} from "react";

export const AuthContext = createContext({
    userContext: {
        nombre: '',
        tipo: '',
    },
    setUserContext: () => {}
});
