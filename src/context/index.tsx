import React from 'react';
import { LangsProvider } from './langsContext';
import { ILangsProps } from './langsContext/langsContext.structure';

const AppProvider: React.FC<ILangsProps> = ({ children }) => {
  return <LangsProvider>{children}</LangsProvider>;
};

export default AppProvider;
