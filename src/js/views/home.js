import React from "react";
import "../../styles/home.css";

export const Home = () => (
	<div className="main container-fluid">
		<div className="button-container ">
			<button className="btn bg-success text-white float-end p-2 me-3 mt-3">Add new contact</button>
		</div>
		<div className="contact-container">
			<div className="row">
				<div className="col-12"></div>
			</div>
		</div>		
	</div>
);
