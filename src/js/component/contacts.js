import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

function Contacts() {
    const { store, actions } = useContext(Context);
	return(
	<>
	{store.contacts.length > 0 && store.contacts.map((item, index) => (
		<li className="list-group-item d-flex justify-content-between p-4" key={item.id}>
			{/* image */}
			<div className="col-2">
				<img className="img-fluid rounded-circle"
					src={actions.getImage(item.id)}
				/>
			</div>
			{/* contact info */}
			<div className="col-8 grid gap-2 ps-5">
				<div className="col">
					<h4>{item.name}</h4>
				</div>
				<div className="col">							
					<p><i className="fas fa-phone"></i>
					&nbsp; {item.phone}</p>
				</div>
				<div className="col">							
					<p><i className="fas fa-envelope"></i>
					&nbsp; {item.email}</p>
				</div>
				<div className="col">
					<p><i className="fas fa-map-marker-alt"></i>
					&nbsp; {item.address}</p>
				</div>
			</div>
			{/* actions - edit & delete */}
			<div className="col-2 d-flex justify-content-evenly">
				<Link to={"/EditContact/" + index}>
				<i className="fas fa-pencil-alt text-dark">
				</i>
				</Link>
				<i className="fas fa-trash-alt"
					data-bs-toggle="modal" data-bs-target={"#deleteModal" + item.id}>
				</i>
			</div>
			{/* modal - delete */}
			<div className="modal fade " id={"deleteModal" + item.id} tabindex="-1" aria-labelledby="confirmDelete" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="confirmDelete">Delete Contact</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						You won't be able to undo. Are you sure?
					</div>
					<div className="modal-footer">
						<button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
						<button type="submit" className="btn btn-danger" data-bs-dismiss="modal"
							onClick={() => actions.deleteContact(item.id)}>
								delete
						</button>
					</div>
					</div>
				</div>
			</div>
		</li>
		))}
	</>
	)
};

export default Contacts;