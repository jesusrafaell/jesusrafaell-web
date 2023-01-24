import React, { useEffect, useRef } from 'react';
import { init } from 'ityped';
import gsap from 'gsap';
import splash from '../images/splashbad.png';
import photo from '../images/face.png';

function Main() {
	const bgRef = useRef<HTMLDivElement>(null);

	const initGsap = () => {
		const t1 = gsap.timeline({ repeat: -1 });
		const t2 = gsap.timeline({ repeat: -1 });
		t1.to('#splash', {
			scale: 0.94,
			duration: 2,
		}).to('#splash', {
			scale: 1,
			duration: 2,
		});
		t2.to('#photo', {
			x: 7,
			y: -7,
			duration: 1.5,
		}).to('#photo', {
			x: 0,
			y: 0,
			duration: 1.5,
		});
	};

	const textRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		initGsap();
		if (!textRef.current) {
			return;
		}
		init(textRef.current, {
			showCursor: true,
			strings: ['Jesus.', 'Developer.', 'FullStack', 'Coder'],
			startDelay: 500,
			backDelay: 2000,
			typeSpeed: 200,
			backSpeed: 100,
		});
	});

	return (
		<div className='h-screen w-screen flex items-center justify-center mb-12 bg-fixed bg-center bg-cover custom-img'>
			<div className='-z-[1] absolute bg-[#111] w-screen h-screen'>
				<div className='bg-main-img absolute' ref={bgRef}></div>
			</div>
			<div id='home' className='w-full h-screen text-center rounded-xl '>
				<div className='wrapper'>
					<div className='cols cols0'>
						<div className='imgbox'>
							<div id='splash' className='img'>
								<img src={splash} alt='' className='rotate-90' />
							</div>
							<div id='photo' className='img'>
								<img src={photo} alt='Jesus' />
							</div>
						</div>
					</div>
					<div className='cols cols1'>
						<span className='topline'>HELLO</span>
						<h1 className='py-5 block text-4xl font-extrabold text-[#E2E2E2]'>
							{`I'm `}
							<span className='text-[#F63030]' ref={textRef}></span>
						</h1>
						<p className='block text-sm text-[#E2E2E2]'>
							I’m focused on building web applications while learning new technologies.
						</p>
						<div className='btns'>
							<button>Download CV</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Main;
