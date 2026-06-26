import React, { ReactNode } from 'react';
import { SDKContext, SDKContextValue } from '../context/SDKContext';

export interface SDKProviderProps {
  children: ReactNode;
  value: SDKContextValue;
}

export const SDKProvider: React.FC<SDKProviderProps> = ({ children, value }) => {
  return (
    <SDKContext.Provider value={value}>
      {children}
    </SDKContext.Provider>
  );
};
