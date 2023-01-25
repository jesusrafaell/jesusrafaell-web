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
				<div className='canvas'>
					<Canvas>
						<ambientLight />
						<pointLight position={[10, 10, 10]} />
						<Box position={[0, 0, 0]} mobile={mobile} />
						<Particles count={mobile ? 400 : 1500} mouse={mouse} />
						{/* <Triangle /> */}
					</Canvas>
				</div>
			</section>
			,
		</Layout>
	);
};

export default IndexPage;
