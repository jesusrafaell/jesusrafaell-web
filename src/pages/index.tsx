import * as React from 'react';
import Layout from '../components/layout';
import Main from '../components/Main';
import Projects from '../components/Projects';
import About from '../components/About';
import Box from '../components/threejs/Box';
import Particles from '../components/threejs/Particles';
import { PageProps } from 'gatsby';
import { Canvas } from 'react-three-fiber';
import { useEffect, useState } from 'react';
import { isMobile } from '../components/CustomCursor';

const IndexPage: React.FC<PageProps> = () => {
	const mouse = React.useRef([0, 0]);

	const [mobile, setMobile] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMobile(isMobile());
		}
		console.log('change size');
	}, []);

	return (
		<Layout>
			<section id='main' className='h:bg-[#111]'>
				<Main />
			</section>
			<section id='project' className='relative'>
				<Projects />
			</section>
			<section id='about' className='relative'>
				<About />
			</section>
			<section id='threejs' className='relative'>
				<div style={{ width: '100vw', height: '100vh' }}>
					<Canvas>
						<ambientLight />
						<pointLight position={[8, 10, 10]} />
						<Box position={[-1.2, 0, 0]} />
						<Particles count={mobile ? 500 : 2000} mouse={mouse} />
						{/* <Triangle /> */}
					</Canvas>
				</div>
			</section>
			,
		</Layout>
	);
};

export default IndexPage;
