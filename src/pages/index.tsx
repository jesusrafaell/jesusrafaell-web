import * as React from 'react';
import Layout from '../components/layout';
import Main from '../components/Main';
import Projects from '../components/Projects';
import About from '../components/About';
import Box from '../components/threejs/Box';
import Particles from '../components/threejs/Particles';
import { PageProps } from 'gatsby';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Suspense, useEffect, useState } from 'react';
import { isMobile } from '../components/CustomCursor';
import Triangle from '../components/threejs/Triangle';
import * as THREE from 'three';
import { OrbitControls, CameraShake, Environment } from '@react-three/drei';
import GltfModel from '../components/threejs/gltf';
// import Gltf from '../images/threeJS/rocket.gltf';

function Rig({ hover }: any) {
	const [vec] = useState(() => new THREE.Vector3());
	const { camera, mouse } = useThree();

	console.log(hover);

	useFrame(() => {
		if (hover) {
			camera.position.lerp(vec.set(mouse.x * 6, 30 + mouse.y * 6, 30), 0.05);
		} else {
			camera.position.lerp(vec.set(0, 160, 160), 0.05);
		}
	});

	return (
		<CameraShake
			maxYaw={0.01}
			maxPitch={0.01}
			maxRoll={0.01}
			yawFrequency={0.5}
			pitchFrequency={0.5}
			rollFrequency={0.4}
		/>
	);
}

const IndexPage: React.FC<PageProps> = () => {
	const mouse = React.useRef([0, 0]);

	const [hover, setHover] = useState(false);

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
				<div
					className='canvas'
					onPointerOver={() => setHover(true)}
					onPointerOut={() => setHover(false)}
					//
				>
					<Canvas shadows dpr={[1, 2]} camera={{ position: [0, 160, 160], fov: 20 }}>
						<Suspense fallback={null}>
							<ambientLight intensity={0.3} />
							<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
							<pointLight position={[-10, -10, -10]} />
							<GltfModel scale={40} position={[0, 0, 0]} />
							<OrbitControls />
						</Suspense>
						{/* <Triangle position={[0, 0, 0]} /> */}
						{/* <ambientLight /> */}
						{/* <pointLight position={[10, 10, 10]} /> */}
						{/* <Box position={[-2, 0, 0]} mobile={mobile} /> */}
						{/* <Particles count={mobile ? 400 : 1000} mouse={mouse} /> */}
						{/* <Environment preset='warehouse' /> */}
						{/* <Rig hover={hover} /> */}
					</Canvas>
				</div>
			</section>
			,
		</Layout>
	);
};

export default IndexPage;
