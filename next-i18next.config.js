module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es', 'ar'],
    localeDetection: false,
  },
  localePath: typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/locales',
}; 