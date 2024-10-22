
// import React, { createContext, useContext, useState } from 'react';

// const RoleContext = createContext();

// export const RoleProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

//   return (
//     <RoleContext.Provider value={{ userRole, setUserRole }}>
//       {children}
//     </RoleContext.Provider>
//   );
// };

// export const useRole = () => useContext(RoleContext);

import React, { createContext, useContext, useState, useEffect } from 'react';

export const useAuth = () => {
  return useContext(RoleContext)
}
// Role context creation
const RoleContext = createContext();



export const RoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);  // Fixed typo: userRole instead of useRole

    useEffect(() => {
        try {
            const storedRole = localStorage.getItem('userRole');  // Check localStorage for 'userRole'
            if (storedRole) {
                setUserRole(storedRole);
            }
        } catch (e) {
            console.error('Access to localStorage is restricted', e);
            setUserRole('guest');  // Set a default role if access is denied
        }
    }, []);

    return (
        <RoleContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </RoleContext.Provider>
    );
};

// Custom hook to consume the RoleContext
