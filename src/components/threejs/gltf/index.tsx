import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Props {
	modelPath: string;
	scale: number;
	position: number[];
}

const Model: React.FC<Props> = ({ modelPath, scale, position }) => {
	const model = useRef<any>();

	// useFrame((state) => {
	// 	model.current.rotation.x = state.clock.getElapsedTime() * 0.5;
	// 	model.current.rotation.y = state.clock.getElapsedTime() * 0.5;
	// });

	const gltfRef = useRef<any>();

	const loader = new GLTFLoader();
	loader.load(modelPath, (gltf) => {
		gltfRef.current = gltf.scene;
	});

	if (!gltfRef.current) return null;

	return (
		<mesh ref={model}>
			<primitive object={gltfRef.current} />
		</mesh>
	);
};

export default Model;
