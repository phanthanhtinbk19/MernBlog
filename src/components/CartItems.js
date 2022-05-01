import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {updateItem} from "../redux/shopping-cart/cartItemsSlice";
import numberWithCommas from "../utils/numberWithCommas";

const CartItems = (props) => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(props.item.quantity);
	const [item, setItem] = useState(props.item);
	const updateQuantity = (opt) => {
		if (opt === "+") {
			dispatch(updateItem({...item, quantity: quantity + 1}));
		}
		if (opt === "-") {
			dispatch(
				updateItem({...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1})
			);
		}
	};
	useEffect(() => {
		setItem(props.item);
		setQuantity(props.item.quantity);
	}, [props.item]);
	return (
		<div className="cart__item">
			<div className="cart__item__image">
				<img src={item.product.image01} alt="" />
			</div>
			<div className="cart__item__info">
				<div className="cart__item__info__name">
					<Link to={`/catalog/${item.slug}`}>
						{`${item.product.title} - ${item.color} - ${item.size}`}
					</Link>
				</div>
				<div className="cart__item__info__price">{item.price}</div>
				<div className="cart__item__info__quantity">
					<div className="product__info__item__quantity">
						<div
							className="product__info__item__quantity__btn"
							onClick={() => updateQuantity("-")}
						>
							<i className="bx bx-minus"></i>
						</div>
						<div className="product__info__item__quantity__input">
							{quantity}
						</div>
						<div
							className="product__info__item__quantity__btn"
							onClick={() => updateQuantity("+")}
						>
							<i className="bx bx-plus"></i>
						</div>
					</div>
				</div>
				<div className="cart__item__del">
					<i className="bx bx-trash"></i>
				</div>
			</div>
		</div>
	);
};

export default CartItems;
