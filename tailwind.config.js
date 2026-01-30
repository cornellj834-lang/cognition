/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#e2e8f0', // text-gray-200
            a: {
              color: '#60a5fa', // text-blue-400
              '&:hover': {
                color: '#93c5fd', // text-blue-300
              },
            },
            h1: {
              color: '#f8fafc', // text-gray-50
            },
            h2: {
              color: '#f8fafc', // text-gray-50
            },
            h3: {
              color: '#f8fafc', // text-gray-50
            },
            h4: {
              color: '#f8fafc', // text-gray-50
            },
            h5: {
              color: '#f8fafc', // text-gray-50
            },
            h6: {
              color: '#f8fafc', // text-gray-50
            },
            strong: {
              color: '#f8fafc', // text-gray-50
            },
            code: {
              color: '#e2e8f0', // text-gray-200
              backgroundColor: '#1e293b', // bg-gray-800
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#0f172a', // bg-gray-900
              color: '#e2e8f0', // text-gray-200
            },
            blockquote: {
              color: '#cbd5e1', // text-gray-300
              borderLeftColor: '#475569', // border-gray-600
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}