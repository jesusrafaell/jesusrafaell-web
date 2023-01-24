import React, { useRef, useState } from 'react';
import { RootState, useFrame } from 'react-three-fiber';
import * as three from 'three';
import { Vector3 } from 'three';

interface Props {
	position: number[];
}

function Box({ position }: Props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef<three.Mesh>(null);
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);

	// Subscribe this component to the render-loop, rotate the mesh every frame

	useFrame((state: RootState, delta) => (ref.current!.rotation!.y += delta));
	useFrame((state: RootState, delta) => (ref.current!.rotation!.x += delta));

	const vector = new Vector3(...position);
	return (
		<mesh
			position={vector}
			ref={ref}
			scale={clicked ? 2 : 1}
			onClick={() => click(!clicked)}
			onPointerOver={() => hover(true)}
			onPointerOut={() => hover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? '#FFCDCD' : '#DADADA'} />
		</mesh>
	);
}

export default Box;
