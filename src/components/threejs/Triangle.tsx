import React, { useMemo, useRef, useState } from 'react';
import { RootState, useFrame } from 'react-three-fiber';
import { CylinderGeometry, Mesh, TetrahedronGeometry, Vector3 } from 'three';

interface Props {
	position: number[];
}

function Prisma({ position }: Props) {
	const meshRef = useRef<Mesh>(null);
	const [vector, setVector] = useState(new Vector3(...position));
	const [hover, setHover] = useState(false);

	// const geometry = useMemo(() => new CylinderGeometry(1, 0.5, 2, 3), []);
	const geometry = useMemo(() => new TetrahedronGeometry(1, 0), []);

	useFrame((state: RootState, delta) => {
		meshRef.current!.rotation!.y += delta;
		meshRef.current!.rotation!.x += delta;
	});

	useFrame((state, delta) => {
		meshRef.current!.position.y = Math.tan(state.clock.getElapsedTime()) * -1;
		// meshRef.current!.position.x = Math.cos(state.clock.getElapsedTime()) * -1;
	});

	useFrame((state, delta) => {
		meshRef.current!.scale.x = meshRef.current!.scale.y = meshRef.current!.scale.z = hover ? 1 : 0.5;
	});

	return (
		<mesh
			ref={meshRef}
			geometry={geometry}
			position={vector}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<meshStandardMaterial color='hotpink' />
		</mesh>
	);
}

export default Prisma;
