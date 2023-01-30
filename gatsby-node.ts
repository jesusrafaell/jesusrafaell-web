import { GatsbyNode } from 'gatsby';
import { RuleSetRule } from 'webpack';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
	actions.setWebpackConfig({
		module: {
			rules: [
				{
					test: /\.glb$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
							},
						},
					],
				},
			],
		},
	});
};
