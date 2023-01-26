import React, { useRef, useState } from 'react';
import { RootState, useFrame } from 'react-three-fiber';
import * as three from 'three';
import { Vector3 } from 'three';

interface Props {
	position: number[];
	mobile: boolean;
}

function Box({ position, mobile }: Props) {
	const ref = useRef<three.Mesh>(null);

	const [vector, setVector] = useState(new Vector3(...position));
	const [size, setSize] = useState(mobile ? 0.5 : 1);

	const [hover, setHover] = useState(false);
	const [click, setClick] = useState(false);

	useFrame((state: RootState, delta) => {
		ref.current!.rotation!.y += delta;
		ref.current!.rotation!.x += delta;
	});

	useFrame((state, delta) => {
		ref.current!.position.y = Math.sin(state.clock.getElapsedTime()) * 1;
		ref.current!.position.x = position[0] + Math.sin(state.clock.getElapsedTime()) * 1;
	});

	// const { scale } = useSpring({ scale: active ? 1.5 : 1 });

	return (
		<mesh position={vector} ref={ref} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
			<boxGeometry args={[size, size, size]} />
			<meshStandardMaterial color={hover ? '#E53939' : '#DADADA'} />
		</mesh>
	);
}

export default Box;
