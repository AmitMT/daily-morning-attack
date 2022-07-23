module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
	'*.{src/**/*.css}': ['stylelint --fix', 'stylelint'],
	'**/*.ts?(x)': () => 'npm run build-types',
	'*.json': ['prettier --write'],
};
