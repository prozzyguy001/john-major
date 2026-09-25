import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products as allProducts, type Product } from './data';

export type CartItem = { product: Product; qty: number };
export type Page = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'about' | 'contact';

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  customer: { name: string; phone: string; email: string; address: string; city: string; state: string; notes?: string };
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

type StoreCtx = {
  page: Page;
  go: (p: Page, productId?: string) => void;
  activeProductId?: string;
  cart: CartItem[];
  addToCart: (p: Product, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  lastOrder?: Order;
  setLastOrder: (o?: Order) => void;
  search: string;
  setSearch: (s: string) => void;
  category: string | 'All';
  setCategory: (c: string | 'All') => void;
  brand: string | 'All';
  setBrand: (b: string | 'All') => void;
  sort: string;
  setSort: (s: string) => void;
  maxPrice: number;
  setMaxPrice: (n: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (b: boolean) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

const load = (): CartItem[] => {
  try { const raw = localStorage.getItem('jm_cart'); return raw ? JSON.parse(raw) : []; } catch { return []; }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('home');
  const [activeProductId, setActiveProductId] = useState<string | undefined>();
  const [cart, setCart] = useState<CartItem[]>(load);
  const [lastOrder, setLastOrder] = useState<Order | undefined>();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | 'All'>('All');
  const [brand, setBrand] = useState<string | 'All'>('All');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2500000);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => { localStorage.setItem('jm_cart', JSON.stringify(cart)); }, [cart]);

  const go: StoreCtx['go'] = (p, productId) => {
    if (productId) setActiveProductId(productId);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart: StoreCtx['addToCart'] = (p, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === p.id);
      if (ex) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product: p, qty }];
    });
  };
  const updateQty: StoreCtx['updateQty'] = (id, qty) => setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const removeFromCart: StoreCtx['removeFromCart'] = (id) => setCart(prev => prev.filter(i => i.product.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((n, i) => n + i.qty * i.product.price, 0), [cart]);

  const value: StoreCtx = {
    page, go, activeProductId,
    cart, addToCart, updateQty, removeFromCart, clearCart, cartCount, cartTotal,
    lastOrder, setLastOrder,
    search, setSearch, category, setCategory, brand, setBrand, sort, setSort, maxPrice, setMaxPrice, inStockOnly, setInStockOnly,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useStore must be used within StoreProvider');
  return c;
}

export function useFilteredProducts() {
  const { search, category, brand, sort, maxPrice, inStockOnly } = useStore();
  return useMemo(() => {
    let list = [...allProducts];
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (brand !== 'All') list = list.filter(p => p.brand === brand);
    if (inStockOnly) list = list.filter(() => true);
    list = list.filter(p => p.price <= maxPrice);
    const q = search.trim().toLowerCase();
    if (q) list = list.filter(p => (p.name + ' ' + p.brand + ' ' + p.sku + ' ' + p.category).toLowerCase().includes(q));
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [search, category, brand, sort, maxPrice, inStockOnly]);
}
