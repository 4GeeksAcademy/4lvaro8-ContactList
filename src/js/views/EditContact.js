import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

function EditContact() {
	const { store, actions } = useContext(Context)
	const { index } = useParams()

	
	return(
		<>
	<form onSubmit={event => actions.editContact(event, store.contacts[index].id)}>
		<h1 className="text-center">Edit {store.contacts[index].name}</h1>
		{/* image */}
		<div className="m-5 mx-auto col-2">
				<img className="img-fluid rounded-circle"
					src="https://fastly.picsum.photos/id/888/500/500.jpg?hmac=193ABLdwiXPqJB9iujE0eQNt69xyAdyco2UA2yjEAcY"
				/>
		</div>
		{/* name */}
		<div className="mb-3">
			<label for="name" className="form-label">Full Name</label>
			<input type="text" className="form-control" id="name"
				placeholder={store.contacts[index].name}
                value={store.inputs.name || ""} 
				onChange={event => actions.getInput(event)}
			/>
		</div>
		{/* phone */}
		<div className="mb-3">
			<label for="phone" className="form-label">Phone</label>
			<input type="text" className="form-control" id="phone"
				placeholder={store.contacts[index].phone}
				value={store.inputs.phone || ""} 
				onChange={event => actions.getInput(event)}
			/>
		</div>
		{/* email */}
		<div className="mb-3">
			<label for="email" className="form-label">Email</label>
			<input type="email" className="form-control" id="email"
				placeholder={store.contacts[index].email}
				value={store.inputs.email || ""} 
				onChange={event => actions.getInput(event)}
			/>
		</div>
		{/* address */}
		<div className="mb-3">
			<label for="address" className="form-label">Address</label>
			<input type="text" className="form-control" id="address"
				placeholder={store.contacts[index].address}
				value={store.inputs.address || ""} 
				onChange={event => actions.getInput(event)}
			/>
		</div>
		{/* actions - save & cancel */}
		<button type="submit" className="col-12 my-2 btn btn-success"
			data-bs-toggle="modal" data-bs-target="#edtModal">
			save
		</button>
		<Link to="/" className="col-12 my-2 btn btn-secondary"
		onClick={actions.resetInput}>
			cancel
		</Link>
		{/* Modal - edit confirmation */}
	<div className="modal fade" id="edtModal" tabindex="-1" aria-labelledby="#confirmEdt" aria-hidden="true">
	<div className="modal-dialog">
		<div className="modal-content">
		<div className="modal-header">
			<h1 className="modal-title fs-5" id="confirmEdt">Edit Contact</h1>
			<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div className="modal-body">
			<p>Contact changed sucessfully.</p>
		</div>
		<div className="modal-footer">
			<Link to="/">
			<button type="button" className="btn btn-primary" data-bs-dismiss="modal">
				Back to List
			</button>
			</Link>
			<button className="btn btn-secondary" data-bs-dismiss="modal"
				onClick={actions.resetInput}>
				Forgot to Edit Something
			</button>
		</div>
		</div>
	</div>
	</div>
	</form>
	</>
	);
};

export default EditContact;