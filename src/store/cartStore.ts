import { atom, map } from 'nanostores';

export type CartItem = {
  id: string; // The base product ID
  cartItemId: string; // id + size + color
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size: string;
  color: string;
};

export const isCartOpen = atom(false);

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem(item: Omit<CartItem, 'quantity' | 'cartItemId'>) {
  const cartItemId = `${item.id}-${item.size}-${item.color}`;
  const existingEntry = cartItems.get()[cartItemId];
  
  if (existingEntry) {
    cartItems.setKey(cartItemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(cartItemId, {
      ...item,
      cartItemId,
      quantity: 1,
    });
  }
  // isCartOpen.set(true); // Removed to prevent auto-opening drawer
}

export function removeCartItem(cartItemId: string) {
  const existingEntry = cartItems.get()[cartItemId];
  if (existingEntry && existingEntry.quantity > 1) {
    cartItems.setKey(cartItemId, {
      ...existingEntry,
      quantity: existingEntry.quantity - 1,
    });
  } else {
    const items = { ...cartItems.get() };
    delete items[cartItemId];
    cartItems.set(items);
  }
}

export function deleteCartItem(cartItemId: string) {
  const items = { ...cartItems.get() };
  delete items[cartItemId];
  cartItems.set(items);
}

export function emptyCart() {
  cartItems.set({});
}
