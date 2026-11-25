import { Check, Globe } from 'lucide-react';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const currencies: { code: Currency; name: string; flag: string }[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
];

export const CurrencySelector = () => {
  const { currency, setCurrency, currencyConfig } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 font-medium"
        >
          <Globe className="h-4 w-4" />
          <span className="font-semibold">{currencyConfig.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-primary/10"
          >
            <span className="flex items-center gap-2">
              <span>{curr.flag}</span>
              <span>{curr.name}</span>
            </span>
            {currency === curr.code && (
              <Check className="h-4 w-4 text-primary font-bold" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
