import { createContext, useState } from 'react';

const AuthContext = createContext();
function AuthProvider({children}) {
     const [user, serUser] = useState(null);
     const [token, serToken] = useState(null);

    const login = (userData, userToken) => {
         serUser(userData);
         serToken(userToken);
         localStorage.setItem('user', JSON.stringify(userData));
         localStorage.setItem('token', userToken);
         
    }
    const logout = ()=>{
      serUser(null);
      serToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
 return(
   <AuthContext.Provider value={{user, token, login, logout}}>
        {children}
    </AuthContext.Provider>
 )
    
 
}
export {AuthContext, AuthProvider}
