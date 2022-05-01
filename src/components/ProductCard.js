import {set} from "../redux/product-modal/productModalSlice";
import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import Button from "./Button";

const ProductCard = ({img01, img02, name, price, slug}) => {
	const dispatch = useDispatch();
	return (
		<div className="product-card">
			<Link to={`/catalog/${slug}`}>
				<div className="product-card__image">
					<img src={img01} alt="" />
					<img src={img02} alt="" />
				</div>
				<h3>{name}</h3>
				<div className="product-card__price">
					<div className="product-card__price">
						{numberWithCommas(price)}
						<span className="product-card__price__old">
							<del>{numberWithCommas(399000)}</del>
						</span>
					</div>
				</div>
			</Link>
			<div className="product-card__btn">
				<Button
					size="sm"
					icon="bx bx-cart"
					animate={true}
					onClick={() => dispatch(set(slug))}
				>
					Chon mua
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
