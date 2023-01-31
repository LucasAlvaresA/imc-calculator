import React from 'react';

export interface ISelectedLanguage {
  flag?: string;
  languageName?: string;
  country?: string;
  acronym?: string;
}

export type langsType = 'pt-br' | 'en-en' | 'es-es';

export interface ILangsContext {
  language: langsType;
  setLanguage: React.Dispatch<React.SetStateAction<langsType>>;
}

export interface ILangsProps {
  children: React.ReactNode;
}
