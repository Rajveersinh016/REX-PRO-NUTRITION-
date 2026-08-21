import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { CartItem, Product } from '../types';
import { isAdminLoggedIn } from '../services/PaymentService';

// ---- Types ----
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface AppState {
  cart: CartItem[];
  wishlist: string[];
  toasts: Toast[];
  isAdminAuth: boolean;
  cartOpen: boolean;
  searchOpen: boolean;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'SET_ADMIN_AUTH'; payload: boolean }
  | { type: 'SET_CART_OPEN'; payload: boolean }
  | { type: 'SET_SEARCH_OPEN'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'LOAD_WISHLIST'; payload: string[] };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_CART': return { ...state, cart: action.payload };
    case 'LOAD_WISHLIST': return { ...state, wishlist: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        i => i.productId === action.payload.productId &&
          i.flavour === action.payload.flavour &&
          i.weight === action.payload.weight
      );
      let newCart: CartItem[];
      if (existing) {
        newCart = state.cart.map(i =>
          i.productId === action.payload.productId && i.flavour === action.payload.flavour && i.weight === action.payload.weight
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        newCart = [...state.cart, action.payload];
      }
      localStorage.setItem('rxp_cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(i => !(i.productId === action.payload));
      localStorage.setItem('rxp_cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'UPDATE_QUANTITY': {
      const newCart = state.cart.map(i =>
        i.productId === action.payload.productId
          ? { ...i, quantity: action.payload.quantity }
          : i
      ).filter(i => i.quantity > 0);
      localStorage.setItem('rxp_cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'CLEAR_CART': {
      localStorage.setItem('rxp_cart', JSON.stringify([]));
      return { ...state, cart: [] };
    }
    case 'TOGGLE_WISHLIST': {
      const inList = state.wishlist.includes(action.payload);
      const newWishlist = inList
        ? state.wishlist.filter(id => id !== action.payload)
        : [...state.wishlist, action.payload];
      localStorage.setItem('rxp_wishlist', JSON.stringify(newWishlist));
      return { ...state, wishlist: newWishlist };
    }
    case 'ADD_TOAST': return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST': return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    case 'SET_ADMIN_AUTH': return { ...state, isAdminAuth: action.payload };
    case 'SET_CART_OPEN': return { ...state, cartOpen: action.payload };
    case 'SET_SEARCH_OPEN': return { ...state, searchOpen: action.payload };
    default: return state;
  }
}

const initialState: AppState = {
  cart: [],
  wishlist: [],
  toasts: [],
  isAdminAuth: false,
  cartOpen: false,
  searchOpen: false,
};

interface AppContextType {
  state: AppState;
  addToCart: (product: Product, quantity: number, flavour: string, weight: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  showToast: (type: Toast['type'], message: string) => void;
  setAdminAuth: (v: boolean) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('rxp_cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('rxp_wishlist') || '[]');
      dispatch({ type: 'LOAD_CART', payload: cart });
      dispatch({ type: 'LOAD_WISHLIST', payload: wishlist });
    } catch {}
    dispatch({ type: 'SET_ADMIN_AUTH', payload: isAdminLoggedIn() });
  }, []);

  const addToCart = useCallback((product: Product, quantity: number, flavour: string, weight: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product.id, quantity, flavour, weight, price: product.price } });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  }, []);

  const showToast = useCallback((type: Toast['type'], message: string) => {
    const id = `toast-${Date.now()}`;
    dispatch({ type: 'ADD_TOAST', payload: { id, type, message } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3500);
  }, []);

  const setAdminAuth = useCallback((v: boolean) => dispatch({ type: 'SET_ADMIN_AUTH', payload: v }), []);
  const setCartOpen = useCallback((v: boolean) => dispatch({ type: 'SET_CART_OPEN', payload: v }), []);
  const setSearchOpen = useCallback((v: boolean) => dispatch({ type: 'SET_SEARCH_OPEN', payload: v }), []);

  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = state.cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <AppContext.Provider value={{
      state, addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, showToast, setAdminAuth, setCartOpen, setSearchOpen,
      cartTotal, cartCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
