import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiHome, HiChevronRight } from "react-icons/hi"; // Import icons

const Breadcrumbs = ({ type, checkout, stripe }) => {
	const activeLink = ({ isActive }) => 
		isActive ? "text-accent font-bold" : "text-primary hover:text-accent transition-colors duration-200";

	return (
		<nav className="bg-secondary py-4 md:py-6 shadow-md" aria-label="Breadcrumb">
			<div className="w-full mx-auto px-4 lg:w-9/12 md:px-6">
				<ol className="flex flex-wrap items-center space-x-2 md:space-x-4">
					<li className="flex items-center">
						<Link to="/" className="flex items-center text-primary hover:text-accent transition-colors duration-200">
							<HiHome className="w-5 h-5 mr-1" />
							<span className="text-sm md:text-base font-medium">Home</span>
						</Link>
					</li>

					<li className="flex items-center">
						<HiChevronRight className="w-4 h-4 text-primary" />
						<NavLink to="/all" className={`ml-2 text-sm md:text-base font-medium ${activeLink}`}>
							Products
						</NavLink>
					</li>

					{type && (
						<li className="flex items-center">
							<HiChevronRight className="w-4 h-4 text-primary" />
							<NavLink to={{}} className={`ml-2 text-sm md:text-base font-medium ${activeLink}`}>
								{type}
							</NavLink>
						</li>
					)}

					{checkout && (
						<li className="flex items-center">
							<HiChevronRight className="w-4 h-4 text-primary" />
							<NavLink to={{}} className={`ml-2 text-sm md:text-base font-medium ${activeLink}`}>
								{checkout}
							</NavLink>
						</li>
					)}

					{stripe && (
						<li className="flex items-center">
							<HiChevronRight className="w-4 h-4 text-primary" />
							<NavLink to={{}} className={`ml-2 text-sm md:text-base font-medium ${activeLink}`}>
								{stripe}
							</NavLink>
						</li>
					)}
				</ol>
			</div>
		</nav>
	);
};

export default Breadcrumbs;