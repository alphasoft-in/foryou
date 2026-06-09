import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { addCartItem } from '../store/cartStore';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
}

const SIZES = ['S', 'M', 'L'];
const COLORS = [
  { name: 'Negro', value: '#0f0f0f' },
  { name: 'Beige', value: '#d4c5b9' },
  { name: 'Blanco', value: '#ffffff' }
];

export default function ProductCard({ id, title, price, imageUrl, isNew }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);

  return (
    <div className="group cursor-pointer flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-brand-gray">
        {isNew && (
          <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            Nuevo
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <button 
            onClick={() => addCartItem({ id, title, price, imageUrl, size: selectedSize, color: selectedColor })}
            className="w-full cursor-pointer bg-brand-black text-white py-4 flex items-center justify-center space-x-2 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
      
      <div className="text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm text-gray-800 mb-1 font-medium">{title}</h3>
          <p className="text-sm font-semibold tracking-wider">S/ {price.toFixed(2)}</p>
        </div>
        
        <div className="flex flex-col items-center space-y-3 mt-4">
          {/* Color Selector */}
          <div className="flex space-x-2">
            {COLORS.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-4 h-4 rounded-full border cursor-pointer ${selectedColor === color.name ? 'ring-1 ring-offset-2 ring-gray-800' : 'border-gray-300'} transition-all`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          {/* Size Selector */}
          <div className="flex space-x-2">
            {SIZES.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] font-medium w-7 h-7 flex items-center justify-center border cursor-pointer ${selectedSize === size ? 'border-brand-black text-brand-black bg-gray-50' : 'border-gray-200 text-gray-400 hover:border-gray-400'} transition-colors`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
