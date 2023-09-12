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
        registerSpace: "url('/space.jpg')",
        loginSpace: "url('/space1.jpg')"
      },
      backgroundColor: {
        'glass-container': 'rgba(94, 94, 94, 0.10)',
        'glass-input': 'rgba(134, 134, 134, 0.10)'
      },
      boxShadow: {
        'btn': '0px 0px 20px 10px rgba(41, 114, 255, 0.15)'
      }
    },
  },
  plugins: [],
}
export default config
