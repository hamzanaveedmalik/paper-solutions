import React, { createContext, useContext, useState, useEffect } from 'react';

export type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
};

type CookieConsentContextType = {
  preferences: CookiePreferences | null;
  setPreferences: (prefs: CookiePreferences) => void;
  showBanner: boolean;
  acceptAll: () => void;
  acceptEssential: () => void;
  resetPreferences: () => void;
};

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

const STORAGE_KEY = 'cookie-preferences';

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preferences, setPreferencesState] = useState<CookiePreferences | null>(
    null
  );
  const [showBanner, setShowBanner] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferencesState(parsed);
        setShowBanner(false);
      } catch (e) {
        console.error('Failed to parse cookie preferences:', e);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const setPreferences = (prefs: CookiePreferences) => {
    setPreferencesState(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setShowBanner(false);

    // Dispatch custom event so Google Analytics can react
    window.dispatchEvent(
      new CustomEvent('cookiePreferencesChanged', { detail: prefs })
    );
  };

  const acceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
    });
  };

  const acceptEssential = () => {
    setPreferences({
      essential: true,
      analytics: false,
    });
  };

  const resetPreferences = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferencesState(null);
    setShowBanner(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        setPreferences,
        showBanner,
        acceptAll,
        acceptEssential,
        resetPreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      'useCookieConsent must be used within a CookieConsentProvider'
    );
  }
  return context;
};
