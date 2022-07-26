/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('tailwind-scrollbar')],
	variants: {
		scrollbar: ['dark'],
	},
};
