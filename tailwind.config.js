/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'gravity-bold': ['Gravity-Bold'],
				'gravity-regular': ['Gravity-Regular'],
				'gravity-light': ['Gravity-Light'],
				'gravity-book': ['Gravity-Book'],
			},
			backgroundImage: {
				'keyboard-img': "url('/setup-keyborad.jpeg')",
				'custom-img': "url('/setup-keyborad.jpeg')",
			},
		},
	},
	plugins: [],
};

/*
require('tailwind-scrollbar-hide')
*/
