import React, {useCallback, useEffect, useRef, useState} from "react";
import productData from "../assets/fake-data/products";
import Grid from "../components/Grid";
import Helmet from "../components/Helmet";
import ProductCard from "../components/ProductCard";
import catalog from "../assets/fake-data/category";
import CheckBox from "../components/CheckBox";
import colors from "../assets/fake-data/product-color";
import size from "../assets/fake-data/product-size";
import Button from "../components/Button";
import {clear} from "@testing-library/user-event/dist/clear";
import InfinityList from "../components/InfinityList";
const Catalog = () => {
	const initFilter = {
		category: [],
		color: [],
		size: [],
	};
	const productList = productData.getAllProducts();
	const [products, setProducts] = useState(productList);
	const [filter, setFilter] = useState(initFilter);

	const updateProducts = useCallback(() => {
		let temp = productList;
		if (filter.category.length > 0) {
			temp = temp.filter((e) => filter.category.includes(e.categorySlug));
		}
		if (filter.color.length > 0) {
			temp = temp.filter((e) => {
				const check = e.colors.find((color) => filter.color.includes(color));
				return check;
			});
		}
		if (filter.size.length > 0) {
			temp = temp.filter((e) => {
				const check = e.size.find((size) => filter.size.includes(size));
				return check;
			});
		}

		setProducts(temp);
	}, [filter, setProducts, productList]);

	useEffect(() => {
		updateProducts();
	}, [updateProducts]);
	const filterSelect = (type, checked, item) => {
		if (checked) {
			switch (type) {
				case "CATEGORY":
					setFilter({
						...filter,
						category: [...filter.category, item.categorySlug],
					});
					break;
				case "COLOR":
					setFilter({
						...filter,
						color: [...filter.color, item.color],
					});
					break;
				case "SIZE":
					setFilter({
						...filter,
						size: [...filter.size, item.size],
					});
					break;
				default:
					break;
			}
		} else {
			switch (type) {
				case "CATEGORY":
					console.log(item.categorySlug);

					const newCategory = filter.category.filter(
						(e) => e !== item.categorySlug
					);
					console.log(newCategory);
					setFilter({...filter, category: newCategory});
					break;
				case "COLOR":
					const newColor = filter.color.filter((e) => e !== item.color);
					setFilter({...filter, color: newColor});
					break;
				case "SIZE":
					const newSize = filter.size.filter((e) => e !== item.size);
					setFilter({...filter, size: newSize});
					break;
				default:
					break;
			}
		}
	};
	const clearFilter = () => setFilter(initFilter);
	const filterRef = useRef(null);
	const showHideFilter = () => filterRef.current.classList.toggle("active");
	return (
		<Helmet title="Sản phẩm">
			<div className="catalog">
				<div className="catalog__filter" ref={filterRef}>
					<div
						className="catalog__filter__close"
						onClick={() => showHideFilter()}
					>
						<i className="bx bx-left-arrow-alt"></i>
					</div>
					<div className="catalog__filter__widget">
						<div className="catalog__filter__widget__title">
							danh mục sản phẩm
						</div>
						<div className="catalog__filter__widget__content">
							{catalog.map((item, index) => (
								<div
									key={index}
									className="catalog__filter__widget__content__item"
								>
									<CheckBox
										label={item.display}
										onChange={(input) =>
											filterSelect("CATEGORY", input.checked, item)
										}
										checked={filter.category.includes(item.categorySlug)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="catalog__filter__widget">
						<div className="catalog__filter__widget__title">màu sắc</div>
						<div className="catalog__filter__widget__content">
							{colors.map((item, index) => (
								<div
									key={index}
									className="catalog__filter__widget__content__item"
								>
									<CheckBox
										label={item.display}
										onChange={(input) =>
											filterSelect("COLOR", input.checked, item)
										}
										checked={filter.color.includes(item.color)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="catalog__filter__widget">
						<div className="catalog__filter__widget__title">kích cỡ</div>
						<div className="catalog__filter__widget__content">
							{size.map((item, index) => (
								<div
									key={index}
									className="catalog__filter__widget__content__item"
								>
									<CheckBox
										label={item.display}
										onChange={(input) =>
											filterSelect("SIZE", input.checked, item)
										}
										checked={filter.size.includes(item.size)}
									/>
								</div>
							))}
						</div>
					</div>
					<div className="catalog__filter__widget">
						<div className="catalog__filter__widget__content">
							<Button size="sm" onClick={clearFilter}>
								Xóa bộ lọc
							</Button>
						</div>
					</div>
				</div>
				<div className="catalog__filter__toggle">
					<Button size="sm" onClick={() => showHideFilter()}>
						bộ lọc
					</Button>
				</div>
				<div className="catalog__content">
					<InfinityList data={products} />
				</div>
			</div>
		</Helmet>
	);
};

export default Catalog;
