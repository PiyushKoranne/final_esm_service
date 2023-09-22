/** @type {import('tailwindcss').Config} */
export default {
  content: [
	"./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
		colors: {
			'light': '#F5F5DC',
			'yellow-main': '#FFB000',
			'pink': '#FFCF9D',
			'dark-green': '#004225',
			'light-pink':'#FFFADD',
		},
	}
  },
  plugins: [],
}

