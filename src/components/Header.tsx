import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { cartItems, isCartOpen } from '../store/cartStore';

const InstagramIcon = ({ size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 24, strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const $cartItems = useStore(cartItems);
  
  const totalItems = Object.values($cartItems).reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Colección', path: '/shop' },
    { name: 'Nosotros', path: '/about' }
  ];

  const isActive = (path: string) => {
    // Exact match for home, startsWith for others
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const isDarkText = isScrolled || isMobileMenuOpen;

  let headerClasses = 'bg-transparent py-6 text-white';
  if (isMobileMenuOpen) {
    headerClasses = 'bg-white py-4 text-brand-black';
  } else if (isScrolled) {
    headerClasses = 'bg-white/90 backdrop-blur-md shadow-sm py-4 text-brand-black';
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="container mx-auto px-6">
        {/* Mobile Header (Single Tier) */}
        <div className="flex justify-between items-center md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a href="/" className="flex items-center justify-center rounded-full overflow-hidden bg-white/50 p-1 backdrop-blur-sm transition-transform hover:scale-105">
            <img src="/logo.jpeg" alt="FOR·YOU Logo" className="h-12 w-12 object-cover rounded-full mix-blend-darken" />
          </a>

          <button onClick={() => isCartOpen.set(true)} className="relative hover:opacity-70 transition-opacity group">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className={`absolute -top-1 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${isDarkText ? 'bg-brand-black text-white' : 'bg-white text-brand-black'}`}>
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Header (Classic Premium Layout) */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Logo - Left */}
          <div className="flex-1 flex justify-start">
            <a href="/" className="rounded-full overflow-hidden bg-white/50 p-1 backdrop-blur-sm transition-transform hover:scale-105">
              <img src="/logo.jpeg" alt="FOR·YOU Logo" className="h-12 w-12 object-cover rounded-full mix-blend-darken" />
            </a>
          </div>
          
          {/* Centered Navigation Links */}
          <nav className="flex-[2] flex justify-center space-x-12 text-sm font-medium tracking-widest uppercase">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <a 
                  key={link.name}
                  href={link.path} 
                  className={`hover:opacity-70 transition-opacity relative group ${active ? 'font-bold' : ''}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </a>
              );
            })}
          </nav>

          {/* Icons - Right */}
          <div className="flex-1 flex justify-end items-center space-x-6">
            <button className="hover:opacity-70 transition-opacity">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => isCartOpen.set(true)} className="relative hover:opacity-70 transition-opacity group">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${isDarkText ? 'bg-brand-black text-white' : 'bg-white text-brand-black'}`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full h-screen bg-white text-brand-black shadow-lg transition-all duration-300 origin-top flex flex-col ${
        isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
      }`}>
        <nav className="flex flex-col pt-8 px-6 space-y-4 text-center text-sm font-medium tracking-widest uppercase">
          {navLinks.map((link, index) => {
            const active = isActive(link.path);
            return (
              <a 
                key={link.name}
                href={link.path} 
                className={`py-3 ${index !== navLinks.length - 1 ? 'border-b border-gray-100' : ''} ${active ? 'font-bold' : ''}`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>
        
        {/* Social Media Links */}
        <div className="mt-auto mb-32 flex justify-center space-x-8 text-brand-black">
          <a href="#" className="hover:text-gray-500 transition-colors">
            <InstagramIcon size={24} strokeWidth={1.5} />
          </a>
          <a href="#" className="hover:text-gray-500 transition-colors">
            <FacebookIcon size={24} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
