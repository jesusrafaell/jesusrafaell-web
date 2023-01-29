import React, { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import glb from '../../../images/threeJS/rocket.gltf';

const GltfModel = ({ scale = 40, position = [0, 0, 0] }: any) => {
	const ref: any = useRef();
	const gltf = useLoader(GLTFLoader, glb);
	const [hovered, hover] = useState(false);

	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current.rotation.y += 0.003));

	return (
		<>
			<primitive
				ref={ref}
				object={gltf}
				position={position}
				scale={hovered ? scale * 1.2 : scale}
				onPointerOver={() => hover(true)}
				onPointerOut={() => hover(false)}
			/>
		</>
	);
};

export default GltfModel;
