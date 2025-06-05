import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaQuoteRight, FaStar } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import { AnimatedTitle } from './AnimatedTitle';
import { useTranslation } from 'next-i18next';

const Testimonials = () => {
  const { t } = useTranslation('common');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const testimonials = [
    {
      quote: t('testimonials.0.quote'),
      name: t('testimonials.0.name'),
      position: t('testimonials.0.position'),
      image: "/images/testimonials/client1.png",
      rating: 5,
    },
    {
      quote: t('testimonials.1.quote'),
      name: t('testimonials.1.name'),
      position: t('testimonials.1.position'),
      image: "/images/testimonials/client1.png",
      rating: 5,
    },
    {
      quote: t('testimonials.2.quote'),
      name: t('testimonials.2.name'),
      position: t('testimonials.2.position'),
      image: "/images/testimonials/client2.png",
      rating: 5,
    },
    {
      quote: t('testimonials.3.quote'),
      name: t('testimonials.3.name'),
      position: t('testimonials.3.position'),
      image: "/images/testimonials/client1.png",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col items-center mb-4">
            <span className="inline-block bg-blue-50 px-6 py-1 rounded-xl font-bold subtitle tracking-widest animate__animated animate__zoomInDown" style={{letterSpacing: '0.08em'}}>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('testimonials.badge')}</span>
            </span>
          </div>
          <div className="flex flex-col items-center w-full">
            <AnimatedTitle className="heading heading-lg font-bold mb-8 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full">
              {t('testimonials.title')}
            </AnimatedTitle>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body text-gray-700 dark:text-gray-300 text-center mb-10"
          >
            {t('testimonials.subtitle')}
          </motion.p>
          
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 3 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative flex flex-col justify-between w-full h-[320px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-none transition-colors duration-300">
                    <blockquote className="relative font-serif italic text-lg leading-relaxed px-2 pt-2 pb-8 text-gray-800 dark:text-gray-100">
                      <span className="absolute top-2 left-2 text-5xl text-indigo-400 dark:text-indigo-500 opacity-20 select-none pointer-events-none">“</span>
                      {testimonial.quote}
                      <span className="absolute bottom-2 right-2 text-5xl text-indigo-400 dark:text-indigo-500 opacity-20 select-none pointer-events-none">”</span>
                    </blockquote>
                    <div className="flex items-center gap-3 mt-auto">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-800 shadow-none"
                      />
                      <div>
                        <div className="font-bold text-base font-sans text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm font-sans text-gray-500 dark:text-gray-400">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-button-prev !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-md !border !border-gray-200 dark:!border-gray-700 hover:!bg-blue-50 dark:hover:!bg-gray-700 transition-all">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-md !border !border-gray-200 dark:!border-gray-700 hover:!bg-blue-50 dark:hover:!bg-gray-700 transition-all">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="swiper-pagination !bottom-[-30px]" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper {
          padding: 20px 0;
        }
        .testimonials-swiper .swiper-slide {
          height: auto;
          display: flex;
          justify-content: center;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: #3B82F6 !important;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          display: none;
        }
        .swiper-pagination-bullet {
          background: #3B82F6 !important;
        }
        .swiper-pagination-bullet-active {
          background: #3B82F6 !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials; 