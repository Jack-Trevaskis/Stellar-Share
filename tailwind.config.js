/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './client/**/*.{html,js,jsx,ts,tsx}', // Include client folder
    './src/**/*.{html,js,jsx,ts,tsx}', // Include src folder if applicable
  ],
  theme: {
    extend: {
      colors: {
        // Solarized Dark palette
        base03: '#002b36',
        base02: '#073642',
        base01: '#586e75',
        base00: '#657b83',
        base0: '#839496',
        base1: '#93a1a1',
        base2: '#eee8d5',
        base3: '#fdf6e3',
        yellow: '#b58900',
        orange: '#cb4b16',
        red: '#dc322f',
        magenta: '#d33682',
        violet: '#6c71c4',
        blue: '#268bd2',
        cyan: '#2aa198',
        green: '#859900',
      },
      boxShadow: {
        'glow-yellow': '0 0 10px rgba(181, 137, 0, 0.7)', // yellow glow
        'glow-orange': '0 0 10px rgba(203, 75, 22, 0.7)', // orange glow
      },
    },
  },
  plugins: [],
}
