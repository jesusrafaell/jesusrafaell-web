import React, { useEffect, useRef, useState } from 'react';

export const isMobile = (): boolean =>
	/iPhone|iPad|iPod|Android/i.test(
		typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : ''
	);

const CustomCursor = () => {
	const secondaryCursor = useRef<HTMLDivElement>(null);

	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setShowCursor(!isMobile());
		}
		console.log('change size');
	}, []);

	const mainCursor = useRef<HTMLDivElement>(null);
	const positionRef = useRef({
		mouseX: 0,
		mouseY: 0,
		destinationX: 0,
		destinationY: 0,
		distanceX: 0,
		distanceY: 0,
		key: -1,
	});

	useEffect(() => {
		document.addEventListener('mousemove', (event) => {
			const { clientX, clientY } = event;

			const mouseX = clientX;
			const mouseY = clientY;

			const rect = secondaryCursor.current?.getBoundingClientRect();

			if (!secondaryCursor.current || !secondaryCursor.current.clientWidth) return;

			positionRef.current.mouseX = mouseX - secondaryCursor.current?.clientWidth / 2;
			positionRef.current.mouseY = mouseY - secondaryCursor.current?.clientHeight / 2;
			mainCursor.current!.style!.transform = `translate3d(${mouseX - mainCursor.current!.clientWidth / 2}px, ${
				mouseY - mainCursor.current!.clientHeight / 2
			}px, 0)`;
		});

		return () => {};
	}, []);

	useEffect(() => {
		const followMouse = () => {
			if (!secondaryCursor.current || !secondaryCursor.current?.style) return;
			positionRef.current.key = requestAnimationFrame(followMouse);
			const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = positionRef.current;
			if (!destinationX || !destinationY) {
				positionRef.current.destinationX = mouseX;
				positionRef.current.destinationY = mouseY;
			} else {
				positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
				positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
				if (Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.1) {
					positionRef.current.destinationX = mouseX;
					positionRef.current.destinationY = mouseY;
				} else {
					positionRef.current.destinationX += distanceX;
					positionRef.current.destinationY += distanceY;
				}
			}
			secondaryCursor.current!.style.transform = `translate(${destinationX}px, ${destinationY}px)`;
		};
		followMouse();
	}, []);

	return (
		<div style={{ visibility: showCursor ? 'visible' : 'hidden' }}>
			<div className='main-cursor ' ref={mainCursor}>
				<div className='main-cursor-background'></div>
			</div>
			<div className='secondary-cursor' ref={secondaryCursor}>
				<div className='cursor-background'></div>
			</div>
		</div>
	);
};

export default CustomCursor;
