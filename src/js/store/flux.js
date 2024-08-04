import { object } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	const slug = 'blacklist';


	return {
		store: {
			contacts: [],
			inputs: {},
			images: [
				"https://fastly.picsum.photos/id/888/500/500.jpg?hmac=193ABLdwiXPqJB9iujE0eQNt69xyAdyco2UA2yjEAcY",
			],
		},
		actions: {
			getInput: (event) => {
				const name = event.target.id;
				const value = event.target.value;
				setStore({...getStore,
						  inputs: {...getStore().inputs, [name]: value}})
			},
			
			getImage: (id) => (
				id % 1 === 0
				? getStore().images[0]
				: 0
			),


			resetInput: () => {
				setStore({...getStore,inputs: {}})
			},

			createList: () => {

				fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: 'POST',
					headers: {
					"accept": "application/json"
					}
				}).then(response => {
					console.log(response);
					if(response.ok) return;
					throw Error(response.status)
				}).catch(err => {
					console.log(err);
				})
			},

			getContactList: () => {
				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
					method: 'GET',
					headers: {
						"accept": "application/json",
					}
				}).then(response => {
					console.log(response);
					if(response.status === 404) getActions().createList();
					if(response.ok) return response.json();
					throw Error(response.status)
				}).then((object) => {
					setStore({...getStore, contacts: object.contacts})
				}).catch(err => {
					console.log(err);
				})
			},

			addContact: (event) => {
				event.preventDefault();

				const input = getStore().inputs;
				const newContact = {
					"name": input.name,
					"address": input.address,
					"phone": input.phone,
					"email": input.email,
				};

				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/`, {
					method: 'POST',
					body: JSON.stringify(newContact),
					headers: {
					"Content-Type": "application/json",
					"accept": "application/json",
					}
				}).then(response => {
					console.log(response);
					if(response.status === 201) return;
					throw Error(response.status)
				}).then(() => {
					getActions().getContactList()
					getActions().resetInput()
				}).catch(err => {
					console.log(err);
				})
			},

			editContact: (event, id) => {
				event.preventDefault();

				const input = getStore().inputs;
				const updateContact = {
					"name": input.name,
					"address": input.address,
					"phone": input.phone,
					"email": input.email,
				};

				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: 'PUT',
					body: JSON.stringify(updateContact),
					headers: {
					"Content-Type": "application/json",
					"accept": "application/json",
					}
				}).then(response => {
					console.log(response);
					if(response.ok) return;
					throw Error(response.status)
				}).then(() => {
					getActions().getContactList();
					getActions().resetInput();
					return redirect("/");
				}).catch(err => {
					console.log(err);
				})
			},

			deleteContact: (id) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: 'DELETE',
					headers: {
						"accept": "application/json"
					}
				}).then(response => {
					if(response.status === 204) return;
					throw Error(response.status)
				}).then(() => {
					getActions().getContactList()
				}).catch(err => {
					console.log('Error', err);
				})
			},

		}
	};
};

export default getState;