/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import CSSRulePlugin from 'gsap/dist/CSSRulePlugin';
//Companys
import img_sitran_1 from '../images/projects/sitran_1.png';
import logoCarropago from '../images/projects/logo-carropago.png';
import logoLibrepago from '../images/projects/logo-librepago.png';
//Tech
import nestLogo from '../images/nest-logo.svg';
import reactLogo from '../images/react-logo.svg';
import nodeLogo from '../images/nodejs-logo.png';

interface Item {
	img: string;
	imgTech: string;
	developments: string;
	title: string;
	desc: string;
	color: {
		active: {
			text: string;
			bg: string;
		};
		normal: {
			text: string;
			bg: string;
		};
	};
	bgColor?: string;
	textColor?: string;
}

const items: Item[] = [
	{
		title: 'Sitran',
		img: img_sitran_1,
		imgTech: reactLogo,
		developments: 'React(Hooks - Redux), express, Node, TypeOrm, TypeScript, Axios, Material UI, SQL',
		desc: `
			Aplicación FullStack para generar reportes de transacciones e
			información de clientes bancarios, carga de archivos en base de datos (SQL).
		`,
		color: {
			active: {
				text: '#fff',
				bg: '#f2f2f2',
			},
			normal: {
				text: '#30c9f6',
				bg: '#121417',
			},
		},
	},
	{
		img: img_sitran_1,
		developments: 'classic',
		imgTech: reactLogo,
		title: 'BackOffice',
		desc: '£300',
		//bgColor: '#ffe474',
		//textColor: '#fff',

		color: {
			active: {
				text: '#fff',
				bg: '#ffe474',
			},
			normal: {
				text: '#30c9f6',
				bg: '#121417',
			},
		},
	},
	{
		img: logoCarropago,
		developments: 'living',
		imgTech: nodeLogo,
		title: 'API CarroPago',
		desc: '£420',
		//bgColor: '#ACCDD4',
		//textColor: '#fff',
		color: {
			active: {
				text: '#fff',
				bg: '#ACCDD4',
			},
			normal: {
				text: '#30c9f6',
				bg: '#121417',
			},
		},
	},
	{
		img: logoLibrepago,
		developments: 'watch',
		title: 'API LibrePago',
		imgTech: nestLogo,
		desc: '£267',
		//bgColor: '#dedede',
		//textColor: '#fff',

		color: {
			active: {
				text: '#fff',
				bg: '#dedede',
			},
			normal: {
				text: '#30c9f6',
				bg: '#121417',
			},
		},
	},
	{
		img: img_sitran_1,
		developments: 'watch',
		title: 'Punto Consulta Tranred',
		imgTech: reactLogo,
		desc: '£267',
		//bgColor: '#dedede',
		//textColor: '#fff',
		color: {
			active: {
				text: '#fff',
				bg: '#000',
			},
			normal: {
				text: '#30c9f6',
				bg: '#121417',
			},
		},
	},
];

const Projects: React.FC = () => {
	const timeLine = gsap.timeline();

	useEffect(() => {
		gsap.registerPlugin(CSSRulePlugin);
	});

	const [active, setActive] = useState(0);
	const [item, setItem] = useState(items[active]);
	const { img, developments, title, desc, imgTech } = item;

	const basicAimation = (dir: number, delay: number, newItem: Item) => {
		timeLine.to('.slider', {
			delay,
			duration: 0.2,
			backgroundColor: `${newItem.color.active.bg}`,
		});
		timeLine
			.fromTo(
				'.slider__img',
				{
					x: 150 * dir,
					opacity: 0,
					duration: 1,
					ease: 'power2.out',
				},
				{
					x: 0,
					opacity: 1,
					duration: 1,
					ease: 'power2.out',
				}
			)
			.fromTo(
				['.slider__context *', '.gsap-dev'],
				{
					x: 50 * dir,
					opacity: 0,
					duration: 0.7,
					stagger: 0.15,
					ease: 'power2.out',
					color: `${newItem.color.active}`,
				},
				{
					x: 0,
					opacity: 1,
					duration: 0.7,
					stagger: 0.15,
					ease: 'power2.out',
				},
				'<'
			)
			.fromTo(
				'.slider_title',
				{
					y: 100,
					ease: 'power4.out',
					skewY: 7,
					stagger: {
						amount: 0.3,
					},
				},
				{
					y: 0,
					skewY: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.15,
					ease: 'power2.out',
				}
			);
	};

	const handleClick = (type: string) => {
		const dir = type === 'next' ? 1 : -1;
		timeLine.to('.slider__img', {
			x: -250 * dir,
			opacity: 0,
			duration: 1,
			ease: 'power2.inOut',

			onComplete: () => {
				let newActive;
				let newItem;
				if (type === 'next') {
					newActive = active === items.length - 1 ? 0 : active + 1;
					newItem = items[newActive];
					setActive(newActive);
					setItem(newItem);
				} else {
					newActive = active <= 0 ? items.length - 1 : active - 1;
					newItem = items[newActive];
					setActive(newActive);
					setItem(newItem);
				}

				basicAimation(dir, 1, newItem);
			},
		});
		timeLine.to(
			['.gsap-dev', '.slider_title', ' .slider__context *'],
			{
				x: -100 * dir,
				opacity: 0,
				duration: 0.7,
				stagger: 0.15,
				ease: 'power2.inOut',
			},
			'<'
		);
	};

	const [bgAnimation, setBgAnimation] = useState(false);

	const handleAnimationBg = () => {
		setBgAnimation(true);
	};

	const handleAnimationBgBack = () => {
		setBgAnimation(false);
	};
	console.log(bgAnimation);

	return (
		<div className='content-slider'>
			<div className={bgAnimation ? 'slider slider_ative' : 'slider'}>
				<div className='inner-container'>
					<div className='slider__wrraper flex-column'>
						<h2 className='slider_title' style={{ color: bgAnimation ? '#000' : '#fff' }}>
							{title}
						</h2>
						<div className='flex-column slider__content'>
							<div className='slider__tech gsap-dev'>
								<img src={imgTech} alt={title} />
							</div>
							<div className='slider__img' onMouseEnter={handleAnimationBg} onMouseLeave={handleAnimationBgBack}>
								<img src={img} alt={title} />
							</div>
							<div className='slider__context flex-column'>
								<p className='slider__desc'>{desc}</p>
								<p className='slider__techs'>
									<span>Teconologias:</span> {developments}
								</p>
							</div>
						</div>
					</div>
					<div className='slideshow-navigation'>
						<button onClick={(e) => handleClick('prev')} className='slideshow-navigation-button prev'>
							<span className='button-arrow'>‹</span>
						</button>
						<button onClick={(e) => handleClick('next')} className='slideshow-navigation-button next'>
							<span className='button-arrow'>›</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
