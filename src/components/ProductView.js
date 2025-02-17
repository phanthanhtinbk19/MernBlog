import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addItem} from "../redux/shopping-cart/cartItemsSlice";
import numberWithCommas from "../utils/numberWithCommas";
import Button from "./Button";

const ProductView = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let product = props.product;

	if (product === undefined)
		product = {
			title: "",
			price: "",
			image01: null,
			image02: null,
			categorySlug: "",
			colors: [],
			slug: "",
			size: [],
			description: "",
		};
	const [previewImg, setPreviewImg] = useState(product.image01);
	const [descriptionExpand, setDescriptionExpand] = useState(false);
	const [color, setColor] = useState(undefined);
	const [size, setSize] = useState(undefined);
	const [quantity, setQuantity] = useState(1);

	const updateQuantity = (type) => {
		if (type === "plus") {
			setQuantity((prev) => prev + 1);
		} else {
			setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
		}
	};
	useEffect(() => {
		setPreviewImg(product.image01);
		setQuantity(1);
		setColor(undefined);
		setSize(undefined);
	}, [product]);
	const check = () => {
		if (color === undefined) {
			alert("Please select color");
			return false;
		}
		if (size === undefined) {
			alert("Please select size");
			return false;
		}
		return true;
	};

	const addToCart = () => {
		if (check()) {
			let newItem = {
				slug: product.slug,
				color: color,
				size: size,
				price: product.price,
				quantity: quantity,
			};
			if (dispatch(addItem(newItem))) {
				alert("success");
			} else {
				alert("Fail");
			}
		}
	};
	const goToCart = () => {
		if (check()) {
			let newItem = {
				slug: product.slug,
				color: color,
				size: size,
				price: product.price,
				quantity: quantity,
			};
			if (dispatch(addItem(newItem))) {
				navigate("/cart");
			} else {
				alert("Fail");
			}
		}
	};
	return (
		<div className="product">
			<div className="product__images">
				<div className="product__images__list">
					<div
						className="product__images__list__item"
						onClick={() => setPreviewImg(product.image01)}
					>
						<img src={product.image01} alt="" />
					</div>
					<div
						className="product__images__list__item"
						onClick={() => setPreviewImg(product.image02)}
					>
						<img src={product.image02} alt="" />
					</div>
				</div>
				<div className="product__images__main">
					<img src={previewImg} alt="" />
				</div>
				<div
					className={`product-description ${
						descriptionExpand ? "expand" : " "
					}`}
				>
					<div className="product-description__title">
						<span>Chi tiết sản phẩm</span>
					</div>
					<div
						className="product-description__content"
						dangerouslySetInnerHTML={{__html: product.description}}
					></div>
					<div className="product-description__toggle">
						<Button
							size="sm"
							onClick={() => setDescriptionExpand(!descriptionExpand)}
						>
							{descriptionExpand ? "Thu gọn" : " Xem thêm"}
						</Button>
					</div>
				</div>
			</div>

			<div className="product__info">
				<div className="product__info__title">{product.title}</div>
				<div className="product__info__item">
					<span className="product__info__item__price">
						{numberWithCommas(product.price)}
					</span>
				</div>
				<div className="product__info__item">
					<div className="product__info__item__title">Màu sắc</div>
					<div className="product__info__item__list">
						{product.colors.map((item, index) => (
							<div
								key={index}
								className={`product__info__item__list__item ${
									color === item ? "active" : ""
								}`}
								onClick={() => setColor(item)}
							>
								<div className={`circle bg-${item}`}></div>
							</div>
						))}
					</div>
				</div>
				<div className="product__info__item">
					<div className="product__info__item__title">Kích cỡ</div>
					<div className="product__info__item__list">
						{product.size.map((item, index) => (
							<div
								key={index}
								className={`product__info__item__list__item ${
									size === item ? "active" : ""
								}`}
								onClick={() => setSize(item)}
							>
								<span className="product__info__item__list__item__size">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="product__info__item">
					<div className="product__info__item__title">Số lượng</div>
					<div className="product__info__item__quantity">
						<div
							className="product__info__item__quantity__btn"
							onClick={() => updateQuantity("minus")}
						>
							<i className="bx bx-minus"></i>
						</div>
						<div className="product__info__item__quantity__input">
							{quantity}
						</div>
						<div
							className="product__info__item__quantity__btn"
							onClick={() => updateQuantity("plus")}
						>
							<i className="bx bx-plus"></i>
						</div>
					</div>
				</div>
				<div className="product__info__item">
					<Button onClick={() => dispatch(addToCart)}>thêm vào giỏ</Button>
					<Button onClick={() => dispatch(goToCart)}>mua ngay</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductView;
