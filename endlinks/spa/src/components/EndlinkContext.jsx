import React, { createContext, useState, useContext, useEffect } from 'react';

const EndlinkContext = createContext(null);

export function EndlinkTokenProvider({ children }) {
  const [endlinkToken, setEndlinkToken] = useState(null);

  useEffect(() => {
    console.log('Endlink token was set to', endlinkToken);
  }, [endlinkToken]);

  return (
    <EndlinkContext.Provider value={{ endlinkToken, setEndlinkToken }}>
      {children}
    </EndlinkContext.Provider>
  );
}

export function useEndlinkToken() {
  const context = useContext(EndlinkContext);
  if (!context) {
    throw new Error(
      'useEndlinkToken must be used within a EndlinkTokenProvider'
    );
  }
  return context;
}
