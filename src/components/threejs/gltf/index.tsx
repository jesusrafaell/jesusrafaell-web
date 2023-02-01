import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as three from 'three';
import './loading.scss';

interface Props {
	modelPath: string;
	scale: number;
	position: number[];
	loading: boolean;
	setLoading: any;
}

const Model: React.FC<Props> = ({ modelPath, scale, position, loading, setLoading }) => {
	const refModel = useRef<three.Mesh>(null);

	const gltfRef = useRef<three.Group>();

	useFrame((state) => {
		if (refModel.current) {
			refModel.current!.rotation.x = state.clock.getElapsedTime() * 0.25;
			refModel.current!.rotation.y = state.clock.getElapsedTime() * 0.25;
			refModel.current!.rotation.z = state.clock.getElapsedTime() * 0.25;
		}
	});

	const loader = new GLTFLoader();
	if (!loading) {
		console.log('loader', loader);
		loader.load(
			modelPath,
			(gltf) => {
				gltfRef.current = gltf.scene;
			},
			(xhr) => {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
				setLoading(true);
			},
			(err) => {
				console.log('Error load GLTF');
			}
		);
	}

	if (!gltfRef.current) return null;

	return (
		<mesh ref={refModel} scale={scale}>
			<primitive object={gltfRef.current} />
		</mesh>
	);
};

export default Model;
