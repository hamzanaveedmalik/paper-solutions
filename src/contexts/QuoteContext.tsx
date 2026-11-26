import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getProductById, getVariant } from '@/data/catalogue';
import type { QuoteLineItem } from '@/data/types';

const STORAGE_KEY = 'pcsuk-quote-list-v1';

type QuoteContextValue = {
  items: QuoteLineItem[];
  itemCount: number;
  addItem: (input: {
    productId: string;
    variantId?: string | null;
    quantity?: number;
  }) => { ok: true } | { ok: false; error: string };
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  clear: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

function lineKey(productId: string, variantId: string | null): string {
  return `${productId}::${variantId || 'base'}`;
}

function loadItems(): QuoteLineItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QuoteLineItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteLineItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (input: { productId: string; variantId?: string | null; quantity?: number }) => {
      const product = getProductById(input.productId);
      if (!product) return { ok: false as const, error: 'Product not found in catalogue.' };

      const needsVariant = product.variants.length > 0;
      const variantId = input.variantId ?? null;
      if (needsVariant && !variantId) {
        return { ok: false as const, error: 'Please select an option before adding to your quote.' };
      }
      if (variantId && !getVariant(product, variantId)) {
        return { ok: false as const, error: 'Selected option is not available.' };
      }

      const quantity = Math.max(1, Math.floor(input.quantity ?? 1));
      setItems((prev) => {
        const key = lineKey(input.productId, variantId);
        const existing = prev.find(
          (i) => lineKey(i.productId, i.variantId) === key
        );
        if (existing) {
          return prev.map((i) =>
            lineKey(i.productId, i.variantId) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [
          ...prev,
          {
            productId: input.productId,
            variantId,
            quantity,
            addedAt: new Date().toISOString(),
          },
        ];
      });
      return { ok: true as const };
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | null, quantity: number) => {
      const next = Math.floor(quantity);
      setItems((prev) => {
        if (next < 1) {
          return prev.filter((i) => lineKey(i.productId, i.variantId) !== lineKey(productId, variantId));
        }
        return prev.map((i) =>
          lineKey(i.productId, i.variantId) === lineKey(productId, variantId)
            ? { ...i, quantity: next }
            : i
        );
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, variantId: string | null) => {
    setItems((prev) =>
      prev.filter((i) => lineKey(i.productId, i.variantId) !== lineKey(productId, variantId))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, itemCount, addItem, updateQuantity, removeItem, clear }),
    [items, itemCount, addItem, updateQuantity, removeItem, clear]
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider');
  return ctx;
}
