import React, {useEffect, useState, useCallback} from "react";
import {Link} from "react-router-dom";
import Button from "./Button";

const HeroSlider = ({data, auto, timeOut}) => {
	const [activeSlide, setActiveSlide] = useState(0);
	const nextSlide = useCallback(() => {
		setActiveSlide((prev) => {
			if (prev + 1 >= data.length) {
				return 0;
			} else {
				return prev + 1;
			}
		});
	}, [data]);
	const prevSlide = useCallback(() => {
		setActiveSlide((prev) => {
			if (prev - 1 < 0) {
				return data.length - 1;
			} else {
				return prev - 1;
			}
		});
	}, [data]);
	useEffect(() => {
		if (auto) {
			const slideAuto = setInterval(() => {
				nextSlide();
			}, timeOut);
			return () => {
				clearInterval(slideAuto);
			};
		}
	}, [nextSlide, timeOut, auto]);
	return (
		<div className="hero-slider">
			{data.map((item, index) => (
				<HeroSliderItem
					key={index}
					item={item}
					active={activeSlide === index}
				/>
			))}
			<div className="hero-slider__control">
				<div className="hero-slider__control__item" onClick={prevSlide}>
					<i className="bx bx-chevron-left"></i>
				</div>

				<div className="hero-slider__control__item">
					<div className="index">
						{activeSlide + 1}/{data.length}
					</div>
				</div>

				<div className="hero-slider__control__item" onClick={nextSlide}>
					<i className="bx bx-chevron-right"></i>
				</div>
			</div>
		</div>
	);
};

export const HeroSliderItem = ({item, active}) => {
	return (
		<div className={`hero-slider__item ${active ? "active" : ""}`}>
			<div className="hero-slider__item__info">
				<div className={`hero-slider__item__info__title color-${item.color}`}>
					<span>{item.title}</span>
				</div>
				<div className="hero-slider__item__info__description">
					<span>{item.description}</span>
				</div>
				<div className="hero-slider__item__info__btn">
					<Link to={item.path}>
						<Button
							backgroundColor={item.color}
							icon="bx bx-cart"
							animate={true}
							size="sm"
						>
							Xem chi tiết
						</Button>
					</Link>
				</div>
			</div>
			<div className="hero-slider__item__image">
				<div className={`shape bg-${item.color}`}></div>
				<img src={item.img} alt="" />
			</div>
		</div>
	);
};
export default HeroSlider;
