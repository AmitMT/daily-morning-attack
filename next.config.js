/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
	poweredByHeader: false,
	trailingSlash: true,
	reactStrictMode: true,
	images: {
		domains: ['avatars.githubusercontent.com'],
	},
});
