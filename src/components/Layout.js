import React from "react";
import {BrowserRouter} from "react-router-dom";
import RoutesApp from "../routes/Routes";
import Footer from "./Footer";
import Header from "./Header";
import ProductViewModal from "./ProductViewModal";

const Layout = () => {
	return (
		<BrowserRouter>
			<Header />
			<div className="container">
				<div className="main">
					<RoutesApp />
				</div>
			</div>
			<Footer />
			<ProductViewModal />
		</BrowserRouter>
	);
};

export default Layout;
