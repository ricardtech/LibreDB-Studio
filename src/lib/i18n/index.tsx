"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { en, type TranslationKey } from "./locales/en";
import { ptBR } from "./locales/pt-BR";

export type Language = "pt-BR" | "en";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isPt: boolean;
}

const STORAGE_KEY = "libredb_lang";

const DICTIONARIES: Record<Language, any> = {
  "pt-BR": ptBR,
  en: en,
};

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback ?? key,
  isPt: false,
});

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt-BR";
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === "en" || stored === "pt-BR") {
    return stored;
  }
  // Detecta se o navegador do usuário tem preferência por pt
  const navLang = navigator.language || "";
  if (navLang.toLowerCase().startsWith("pt")) {
    return "pt-BR";
  }
  return "pt-BR"; // Default para o ecossistema customizado
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initial = getInitialLanguage();
    setLanguageState(initial);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const dict = DICTIONARIES[language] || ptBR;
      const parts = key.split(".");
      let current: any = dict;

      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          return fallback ?? key;
        }
      }

      if (typeof current === "string") {
        return current;
      }

      return fallback ?? key;
    },
    [language],
  );

  const contextValue = useMemo<I18nContextType>(
    () => ({
      language,
      setLanguage,
      t,
      isPt: language === "pt-BR",
    }),
    [language, setLanguage, t],
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}
