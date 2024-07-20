import React from "react";
import { Route, Routes } from "react-router-dom";
import {
	AddProducts,
	AdminHome,
	AdminOrderDetails,
	AdminSidebar,
	Orders,
	ViewProducts,
} from "../../components";

const Admin = () => {
	return (
		<>
			<div className="">
				<div className="w-full bg-background lg:w-9/12 mx-auto h-[91vh] flex ">
					<div className="w-24 md:w-96 border-x-2">
						<AdminSidebar />
					</div>
					<div className="flex-1  text-neutral sm:p-4">
						<Routes>
							<Route path="home" element={<AdminHome />} />
							<Route path="all-products" element={<ViewProducts />} />
							<Route path="add-product/:id" element={<AddProducts />} />
							<Route path="orders" element={<Orders />} />
							<Route path="order-details/:id" element={<AdminOrderDetails />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin;
