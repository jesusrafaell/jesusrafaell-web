import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as three from 'three';
import './index.scss';

interface Props {
	modelPath: string;
	scale: number;
	position: number[];
}

const Model: React.FC<Props> = ({ modelPath, scale, position }) => {
	const refModel = useRef<three.Mesh>(null);

	const gltfRef = useRef<any>();

	useFrame((state) => {
		if (refModel.current) {
			refModel.current!.rotation.x = state.clock.getElapsedTime() * 0.5;
			refModel.current!.rotation.y = state.clock.getElapsedTime() * 0.5;
		}
	});

	const loader = new GLTFLoader();
	loader.load(modelPath, (gltf) => {
		gltfRef.current = gltf.scene;
	});

	if (!gltfRef.current)
		return (
			<div className='spinner-container'>
				<div className='loading-spinner'></div>
			</div>
		);

	return (
		<mesh ref={refModel}>
			<primitive object={gltfRef.current} />
		</mesh>
	);
};

export default Model;
