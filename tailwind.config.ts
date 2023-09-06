import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        space: 'url(https://spaceimages.yash.codes/)'
      },
      backgroundColor: {
        'glass-container': 'rgba(94, 94, 94, 0.10)',
        'glass-input': 'rgba(134, 134, 134, 0.10)'
      },
    },
  },
  plugins: [],
}
export default config
