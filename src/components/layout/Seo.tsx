import { graphql, useStaticQuery } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';
import icon from '../../images/jesus.ico';

interface Props {
	lang: string;
	meta?: [];
	Title: string;
	description?: string;
}

export default function Seo({ lang, Title }: Props) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						url
					}
				}
			}
		`
	);

	const data = site.siteMetadata;
	const newTitle = Title ? `${Title} | Porfafolie` : data.title;

	return (
		<Helmet htmlAttributes={{ lang }}>
			<title itemProp='name' lang='en'>
				{newTitle}
			</title>
			<link rel='shortcut icon' href={icon} />
			<meta name='description' content={data.description} />
			<meta property='og:title' content={data.title} />
			<meta property='og:description' content={data.description} />
			<meta property='og:type' content='website' />
			<meta property='og:url' content={data.url} />
			<meta property='og:site_name' content={data.title} />
		</Helmet>
	);
}

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
};
