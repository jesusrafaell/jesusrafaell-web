import * as React from 'react';
import Layout from '../components/layout';
import Main from '../components/Main';
import Projects from '../components/Projects';
import About from '../components/About';
import Box from '../components/threejs/Box';
import Particles from '../components/threejs/Particles';
import { PageProps } from 'gatsby';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { isMobile } from '../components/CustomCursor';
import Triangle from '../components/threejs/Triangle';
import * as THREE from 'three';
import { OrbitControls, CameraShake, Environment } from '@react-three/drei';
import GltfModel from '../components/threejs/gltf';
import rocket from '../assets/threeJS/rocket.glb';
import { StencilOp } from 'three';

function Rig({ hover }: any) {
	const [vec] = useState(() => new THREE.Vector3());
	const { camera, mouse } = useThree();

	useFrame(() => {
		console.log(hover);
		if (hover) {
			camera.position.lerp(vec.set(0, 80, 80), 1);
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
	const mouse = useRef([0, 0]);

	const [loading, setLoading] = useState(false);

	const [mobile, setMobile] = useState(false);

	const cameraRef = useRef(new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500));

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMobile(isMobile());
		}
	}, []);

	const [hover, setHover] = useState(false);

	useEffect(() => {
		if (cameraRef.current) {
			cameraRef.current.position.x = 0;
			cameraRef.current.position.y = 120;
			cameraRef.current.position.z = 120;
		}
	});

	const [fovState, setFovState] = useState<number>(30);

	const handleClik = () => {
		if (cameraRef.current.fov === 30) {
			setFovState(10);
		} else if (cameraRef.current.fov) {
			setFovState(30);
		}
	};

	useEffect(() => {
		cameraRef.current.fov = fovState;
	}, [fovState]);

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
					<button
						style={{ position: 'absolute', bottom: '20px', zIndex: 9999 }}
						onClick={handleClik}
						className='button'
					>
						Zoom
					</button>
					<Canvas shadows dpr={[1, 2]} camera={cameraRef.current} style={{ opacity: loading ? 1 : 0 }}>
						<Suspense fallback={<html>% loaded</html>}>
							<ambientLight intensity={0.3} />
							<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
							<pointLight position={[-10, -10, -10]} />
							<GltfModel
								modelPath={rocket}
								// scale={fovState === 10 ? 2 : 0.5}
								scale={2}
								position={[0, 0, 0]}
								loading={loading}
								setLoading={setLoading}
							/>
							<Particles count={mobile ? 400 : 1000} mouse={mouse} />
							<OrbitControls enablePan={false} enableZoom={false} />
						</Suspense>
					</Canvas>
					{/* <Triangle position={[0, 0, 0]} /> */}
					{/* {hover && <Rig hover={hover} />} */}
					{/* <ambientLight /> */}
					{/* <pointLight position={[10, 10, 10]} /> */}
					{/* <Box position={[-2, 0, 0]} mobile={mobile} /> */}
					{/* <Particles count={mobile ? 400 : 1000} mouse={mouse} /> */}
					{/* <Environment preset='warehouse' /> */}
				</div>
			</section>
			,
		</Layout>
	);
};

export default IndexPage;
