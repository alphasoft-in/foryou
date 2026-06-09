import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Parallax, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2520&auto=format&fit=crop',
    title: 'ELEGANCIA\nATEMPORAL',
    subtitle: 'Descubre la nueva colección',
    align: 'center'
  },
  {
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2520&auto=format&fit=crop',
    title: 'NUEVA\nTEMPORADA',
    subtitle: 'Estilo y sofisticación',
    align: 'left'
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2520&auto=format&fit=crop',
    title: 'DETALLES\nÚNICOS',
    subtitle: 'Diseñado para destacar',
    align: 'right'
  }
];

export default function HeroSlider() {
  return (
    <div className="relative h-screen min-h-[600px] w-full bg-brand-gray overflow-hidden">
      <Swiper
        effect="fade"
        speed={1000}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Parallax, Pagination, EffectFade]}
        className="w-full h-full"
      >
        {/* Gradient Overlay for Header Contrast */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none"></div>

        {/* Parallax Background for all slides (if desired) or per slide. Per slide is better for crossfade/sliding */}
        
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full overflow-hidden relative">
            {/* Slide Background Image with Parallax */}
            <div
              className="absolute top-0 left-0 w-[120%] h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="-20%"
            ></div>
            
            {/* Dark Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none"></div>
            
            {/* Content Container */}
            <div className={`relative z-10 w-full h-full flex flex-col justify-center px-6 container mx-auto
              ${slide.align === 'center' ? 'items-center text-center' : slide.align === 'left' ? 'items-center text-center md:items-start md:text-left' : 'items-center text-center md:items-end md:text-right'}`}
            >
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 md:mb-6 tracking-wide drop-shadow-lg whitespace-pre-line"
                data-swiper-parallax="-50%"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="800"
              >
                {slide.title}
              </h1>
              <p 
                className="text-sm md:text-base lg:text-xl text-white/90 mb-8 md:mb-10 font-light tracking-widest uppercase drop-shadow-md"
                data-swiper-parallax="-40%"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="800"
              >
                {slide.subtitle}
              </p >
              <a 
                href="/shop" 
                className="inline-block bg-white text-brand-black px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300 shadow-xl"
                data-swiper-parallax="-30%"
                data-swiper-parallax-opacity="0"
                data-swiper-parallax-duration="800"
              >
                Explorar
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom styles for Swiper pagination bullets to match theme */}
      <style>{`
        .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
        .swiper-pagination {
          bottom: 40px !important;
        }
      `}</style>
    </div>
  );
}
