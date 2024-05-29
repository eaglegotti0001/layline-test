import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/flowbite-react/**/*.js'],
  safelist: [
    'border-red-500',
    'border-green-500',
    'border-yellow-300',
    'hover:border-red-500',
    'hover:border-green-500',
    'hover:border-yellow-300',
    'rounded-tl-[20px]',
    'rounded-br-[20px]',
    'rounded-tl-[30px]',
    'rounded-br-[30px]',
    'rounded-[20px]',
    'rounded-[30px]',
    'delay-[300ms]',
    'delay-[600ms]',
    'delay-[900ms]',
    'delay-[1200ms]',
    'delay-[1500ms]',
    'h-[54px]',
    'h-[48px]',
    'h-[36px]',
  ],

  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        'blue-primary': '#1677ff',
        'dark-primary': '#003f5f',
        'light-primary': '#e6f4ff',
        footer: '#031530',
        header: 'rgb(17 24 39)',
      },
      boxShadow: {
        lg: '0px 3px 15px 0px rgba(16, 16, 16, 0.1)',
      },
    },
  },

  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },

  plugins: [require('flowbite/plugin')],
};
export default config;
