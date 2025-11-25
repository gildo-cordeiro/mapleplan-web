module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './build/**/*.{html,js,css}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [],
  // Safelist ensures common utility classes are always generated (diagnostic)
  safelist: [
    'rounded', 'hidden', 'flex', 'min-h-screen', 'text-center'
  ,
    // pattern-based safelist for common utilities used in the UI
    { pattern: /p-\d+/ },
    { pattern: /m-\d+/ },
    { pattern: /bg-(emerald|green|gray|slate|white)-?\d*/ },
    { pattern: /text-(white|black|slate|gray)-?\d*/ },
    { pattern: /font-(bold|semibold|medium|normal)/ },
    { pattern: /shadow(-\w+)?/ }
  ]
}
