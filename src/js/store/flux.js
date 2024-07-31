import { object } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	const slug = 'blacklist';


	return {
		store: {
			contacts: [],
			inputs: {},
			images: [
				"https://img.freepik.com/free-vector/gradient-retro-smiley-emoji-illustration_23-2151041644.jpg?t=st=1712163681~exp=1712164281~hmac=09471ec561627f5b087b22d7b0060ba83aaf488f9f3091da4422ccaaee678bde",
				"https://img.freepik.com/free-vector/gradient-hungry-emoji-illustration_23-2151041567.jpg?w=740&t=st=1712163828~exp=1712164428~hmac=12795208d750087d3954373c76c06deb7317688a918018219c10ada26dec2f06",
			],
		},
		actions: {
			getInput: (event) => {
				const name = event.target.id;
				const value = event.target.value;
				setStore({...getStore,
						  inputs: {...getStore().inputs, [name]: value}})
			},

			resetInput: () => {
				setStore({...getStore,inputs: {}})
			},

			getImage: (id) => (
				id % 2 === 0
				? getStore().images[0]
				: getStore().images[1]
			),

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