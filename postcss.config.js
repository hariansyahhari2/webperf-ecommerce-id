// const purgecss = [
//   '@fullhuman/postcss-purgecss',
//   {
//     content: ['./components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
//     defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
//   },
// ];

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    ...(process.env.NODE_ENV === 'production' ? ['autoprefixer'] : []),
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
