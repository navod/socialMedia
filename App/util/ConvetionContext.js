import React, {createContext, useState, useEffect} from 'react';

export const ConventionContex = createContext();

export const ConventionContexProvider = ({children}) => {
  const [text, setText] = useState('Hello');
  const contextValue = {
    text,
    setText,
  };

  return (
    <ConventionContex.Provider value={contextValue}>
      {children}
    </ConventionContex.Provider>
  );
};
