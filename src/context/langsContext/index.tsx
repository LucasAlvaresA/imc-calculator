import React from 'react';
import { ILangsContext, ILangsProps, langsType } from './langsContext.structure';

const LangsContext = React.createContext({} as ILangsContext);

const LangsProvider: React.FC<ILangsProps> = ({ children }) => {
  const [language, setLanguage] = React.useState('en-en' as langsType);

  React.useLayoutEffect(() => {
    const languageStoraged: string = localStorage.getItem('lang') || 'pt-br';

    setLanguage(languageStoraged as langsType);
  }, []);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage
    }),
    [language, setLanguage]
  );

  return <LangsContext.Provider value={value}>{children}</LangsContext.Provider>;
};

function useLangs(): ILangsContext {
  const context = React.useContext(LangsContext);

  if (context === undefined) {
    throw new Error('useLangs must be used within a LangsProvider');
  }

  return context;
}

export { LangsContext, LangsProvider, useLangs };
