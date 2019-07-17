const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr'],
  localePath: 'src/static/locales',
  localeSubpaths: 'foreign',
  debug: false,
});
