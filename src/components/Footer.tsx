import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <img src="/logo.jpeg" alt="FOR·YOU" className="h-16 w-16 rounded-full mb-6 mix-blend-lighten" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Tendencias y estilo exclusivo para señoritas. Seleccionado en Perú para resaltar tu autenticidad.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">Enlaces</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/shop" className="hover:text-white transition-colors">Nueva Colección</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Ropa</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Accesorios</a></li>
              <li><a href="/sale" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">Soporte</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Suscríbete para recibir noticias y ofertas exclusivas.</p>
            <form className="flex border-b border-gray-600 pb-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-transparent w-full outline-none text-sm placeholder-gray-500"
              />
              <button type="submit" className="text-sm font-medium tracking-wider uppercase hover:text-gray-300 transition-colors">
                Unirse
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} FOR·YOU. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
