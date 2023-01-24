import React, { useEffect, useRef } from 'react';
import splash from '../public/images/jinx3.jpg';
import photo from '../public/images/jesus1.png';
import { init } from 'ityped';
import gsap from 'gsap';
// import TriangleCustom from './threejs/Triangle';
import { Canvas } from '@react-three/fiber/dist/declarations/src';

function About() {
	const textRef = useRef(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const t1 = gsap.timeline({});

	const rotateImg = async () => {
		await t1.to(bgRef.current!, {
			scale: 0.4,
			y: '-40px',
			x: '20px',
			duration: 1,
		});
	};

	const rotateImgRevert = async () => {
		await t1.to(bgRef.current!, {
			scale: 1,
			y: 0,
			x: 0,
			borderRadius: 0,
			rotation: '0',
			duration: 1,
		});
	};

	return (
		<div className='w-full h-full mx-auto p-2 flex justify-center items-center'>
			<div>
				<p className='uppercase text-sm tracking-widest md:text-gray-100 lg:text-gray-400'>
					LET&#39;S BUILD SOMETHING TOGETHER
				</p>
				<h1 className='py-4 text-white'>
					{'Hi, my name is '}
					<span className='text-cyan-300'>Jesus Rafael</span>
				</h1>
				<h1 className='py-2 text-white'>Web Developer</h1>
				<p className='py-4 text-gray-400 sm:max-w-[70%] m-auto'>
					I’m focused on building web applications while learning new technologies.
				</p>
			</div>
		</div>
	);
}

export default About;
