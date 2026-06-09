import React from 'react';
import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, removeCartItem, addCartItem, deleteCartItem, emptyCart } from '../store/cartStore';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  const items = Object.values($cartItems);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!$isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-[100] transition-opacity"
        onClick={() => isCartOpen.set(false)}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-light tracking-widest uppercase">Carrito ({items.length})</h2>
          <button onClick={() => isCartOpen.set(false)} className="cursor-pointer hover:text-gray-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <p className="font-light">Tu carrito está vacío.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.cartItemId} className="flex space-x-4">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-24 object-cover bg-gray-100" />
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider mt-1">Color: {item.color} | Talla: {item.size}</p>
                      <p className="text-sm font-semibold mt-2">S/ {item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => deleteCartItem(item.cartItemId)} className="cursor-pointer text-gray-400 hover:text-black">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => removeCartItem(item.cartItemId)}
                      className="cursor-pointer w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:border-black transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => addCartItem(item)}
                      className="cursor-pointer w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:border-black transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between mb-6">
              <span className="text-sm font-medium tracking-wider uppercase">Subtotal</span>
              <span className="text-lg font-semibold tracking-wider">S/ {total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                const message = `¡Gracias por tu interés en nuestra tienda!\n\nHas intentado proceder al pago por un total de S/ ${total.toFixed(2)}.\n\nPróximamente integraremos una pasarela de pagos (como MercadoPago o Stripe) o un enlace a WhatsApp.`;
                alert(message);
                emptyCart();
                isCartOpen.set(false);
              }}
              className="cursor-pointer w-full bg-brand-black text-white py-4 text-sm font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors mb-3"
            >
              Proceder al Pago
            </button>
            <button 
              onClick={() => isCartOpen.set(false)}
              className="cursor-pointer w-full bg-transparent text-brand-black py-4 text-sm font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors underline underline-offset-4"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
