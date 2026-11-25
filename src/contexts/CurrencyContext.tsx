import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type Currency = 'USD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  locale: string;
  rate: number; // Exchange rate relative to USD (base)
}

const currencyConfigs: Record<Currency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', locale: 'en-US', rate: 1 },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', rate: 0.79 },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', rate: 0.92 },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencyConfig: CurrencyConfig;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number, fromCurrency?: Currency) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

// EU country codes
const EU_COUNTRIES = [
  'AT',
  'BE',
  'CY',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PT',
  'SK',
  'SI',
  'ES',
];

const detectUserCurrency = async (): Promise<Currency> => {
  // Try to get saved preference from localStorage first
  const saved = localStorage.getItem('preferredCurrency');
  if (saved && (saved === 'USD' || saved === 'GBP' || saved === 'EUR')) {
    console.log('💾 Using saved currency preference:', saved);
    return saved as Currency;
  }

  // Try browser timezone first (fast and reliable)
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('🌍 Detected timezone:', timezone);

    // UK timezones
    if (timezone.includes('London') || timezone.includes('Europe/London')) {
      console.log('✅ Detected UK location from timezone');
      return 'GBP';
    }

    // European timezones
    const euTimezones = [
      'Europe/Paris',
      'Europe/Berlin',
      'Europe/Madrid',
      'Europe/Rome',
      'Europe/Amsterdam',
      'Europe/Brussels',
      'Europe/Vienna',
      'Europe/Dublin',
      'Europe/Lisbon',
      'Europe/Athens',
      'Europe/Helsinki',
      'Europe/Stockholm',
      'Europe/Copenhagen',
      'Europe/Warsaw',
      'Europe/Prague',
      'Europe/Budapest',
    ];

    if (euTimezones.some((tz) => timezone.includes(tz))) {
      console.log('✅ Detected EU location from timezone');
      return 'EUR';
    }

    // US timezones
    if (
      timezone.includes('America/New_York') ||
      timezone.includes('America/Chicago') ||
      timezone.includes('America/Denver') ||
      timezone.includes('America/Los_Angeles')
    ) {
      console.log('✅ Detected US location from timezone');
      return 'USD';
    }
  } catch (error) {
    console.warn('⚠️ Timezone detection failed:', error);
  }

  // Fallback to IP-based detection
  try {
    console.log('🔍 Attempting IP-based location detection...');

    // Try multiple services with timeout
    const fetchWithTimeout = (url: string, timeout = 3000) => {
      return Promise.race([
        fetch(url),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), timeout)
        ),
      ]);
    };

    const response = await fetchWithTimeout('https://ipapi.co/json/');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const countryCode = data.country_code as string;

    console.log('📍 Detected country code:', countryCode);

    // Map country to currency
    if (countryCode === 'GB') {
      console.log('✅ Setting currency to GBP');
      return 'GBP';
    } else if (countryCode === 'US') {
      console.log('✅ Setting currency to USD');
      return 'USD';
    } else if (EU_COUNTRIES.includes(countryCode)) {
      console.log('✅ Setting currency to EUR');
      return 'EUR';
    }

    console.log('ℹ️ Country not in main markets, defaulting to USD');
    return 'USD';
  } catch (error) {
    console.error('❌ IP-based detection failed:', error);
    console.log('⚠️ Falling back to USD as default currency');
    return 'USD';
  }
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const [currency, setCurrencyState] = useState<Currency>('USD'); // Start with USD as default
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect currency on mount
    const initializeCurrency = async () => {
      const detectedCurrency = await detectUserCurrency();
      setCurrencyState(detectedCurrency);
      setIsLoading(false);
    };

    initializeCurrency();
  }, []);

  useEffect(() => {
    // Save preference to localStorage whenever it changes (but not on initial load)
    if (!isLoading) {
      localStorage.setItem('preferredCurrency', currency);
    }
  }, [currency, isLoading]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  const currencyConfig = currencyConfigs[currency];

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const convertPrice = (
    amount: number,
    fromCurrency: Currency = 'USD'
  ): number => {
    // Convert from source currency to USD first (if needed)
    const amountInUSD = amount / currencyConfigs[fromCurrency].rate;
    // Then convert from USD to target currency
    return amountInUSD * currencyConfig.rate;
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    currencyConfig,
    formatPrice,
    convertPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
