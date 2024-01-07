const path = require('path');
const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: [{
					loader: '@svgr/webpack',
					options: {
						typescript: true,
					},
				}],
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles'), path.join(__dirname, 'src')],
	},
};

module.exports = withNextIntl(nextConfig);
