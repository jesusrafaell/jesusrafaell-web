import React from 'react';
import CustomCursor from '../CustomCursor';
import Navbar from '../navbar';
import Seo from './Seo';

interface Props {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
	return (
		<>
			<Seo lang='en' Title='JesusRafaell' />
			<CustomCursor />
			<Navbar />
			<div id='content'>{children}</div>
		</>
	);
};

export default Layout;
