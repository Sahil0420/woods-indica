import React from "react";

const Header = ({ text }) => {
	return (
		<section className="h-10 md:h-10 w-full bg-secondary flex items-center">
			<div className="w-full mx-auto px-2 lg:w-9/12 md:px-6 ">
				<h1 className="text-lg font-light">{text}</h1>
			</div>
		</section>
	);
};

export default Header;


