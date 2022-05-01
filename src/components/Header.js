import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import logo from "../assets/images/Logo-2.png";

const mainNav = [
	{
		display: "Trang chủ",
		path: "/",
	},
	{
		display: "Sản phẩm",
		path: "/catalog",
	},
	{
		display: "Phụ kiện",
		path: "/accessories",
	},
	{
		display: "Liên hệ",
		path: "/contact",
	},
];
const Header = () => {
	const [indexActive, setindexActive] = useState(0);
	const headerRef = useRef(null);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (
				document.body.scrollTop > 80 ||
				document.documentElement.scrollTop > 80
			) {
				headerRef.current.classList.add("shrink");
			} else {
				headerRef.current.classList.remove("shrink");
			}
		});
		return () => {
			window.removeEventListener("scroll");
		};
	}, []);
	return (
		<div className="header" ref={headerRef}>
			<div className="container">
				<div className="header__logo">
					<Link to="/">
						<img src={logo} alt="" />
					</Link>
				</div>
				<div className="header__menu">
					<div className="header__menu__mobile-toggle">
						<i className="bx bx-menu-alt-left"></i>
					</div>
					<div className="header__menu__left">
						<div className="header__menu__left__close">
							<i className="bx bx-chevron-left"></i>
						</div>
						{mainNav.map((item, index) => (
							<div
								key={index}
								className={`header__menu__item header__menu__left__item ${
									index === indexActive ? "active" : " "
								}`}
							>
								<Link to={item.path} onClick={() => setindexActive(index)}>
									<span>{item.display}</span>
								</Link>
							</div>
						))}
					</div>
					<div className="header__menu__right">
						<div className="header__menu__right__item header__menu__item">
							<i className="bx bx-search"></i>
						</div>
						<div className="header__menu__right__item header__menu__item">
							<Link to="/cart">
								<i className="bx bx-shopping-bag"></i>
							</Link>
						</div>
						<div className="header__menu__right__item header__menu__item">
							<i className="bx bx-user"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
