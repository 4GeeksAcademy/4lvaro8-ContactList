import React from "react";
import { Link } from "react-router-dom";

import "../../styles/home.css";

import Contacts from "../component/contacts";

function Home() {
	return(
	<>
	<div className="py-3 d-flex justify-content-end">
		<Link to="/NewContact" className="btn btn-success me-4 ms-3" type="button">
			Add new contact
		</Link>
	</div>
	<div className="">
		<ul className="list-group">
			<Contacts />
		</ul>
	</div>
	</>
	)
};

export default Home;