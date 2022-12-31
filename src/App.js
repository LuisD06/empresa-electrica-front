import { useState } from "react";
import { AuthContext } from "./context/AuthProvider";
import MainNavigation from './navigation/main-navigation';

function App() {
  const [userContext, setUserContext] = useState({});
  const context = {userContext, setUserContext};

  return (
    <AuthContext.Provider value={context}>
      <MainNavigation/>
    </AuthContext.Provider>
  );
}

export default App;