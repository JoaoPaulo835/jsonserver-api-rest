import React, { useState } from "react"
import DropComapies from "./DropCompanies"
//realiza as importações necesárias do React

const Form = ({ userData = {}, postUser, updateUser }) => { //aqui demonstra que o Form aceita algumas props que são:
	//userData, postUser e updateUser
	const [user, setUser] = useState({
		name: userData.name ?? "", // o nome
		username: userData.username ?? "", // o nome de usuário
		email: userData.email ?? "", //email
		phone: userData.phone ?? "", //telefone
		companiesId: userData.companiesId ?? "0", //Id
	})

	const handleValue = e => { //utiliza a mudança de qualquer campo no formulário a ser preenchido
		setUser({ ...user, [e.target.name]: e.target.value }) //seleciona o valor e o nome
	}

	const submitUser = e => {
		e.preventDefault() //previne se a seleção é válida para o formulário


		if (user.companiesId === "0") return

		if (userData.id) {
			updateUser(userData.id, user)
		} else {
			postUser(user)
		}
	}
	return ( //submete os valores para cada solicitação (nome, email, telefone) isso fica armazenado o db.json
		<form onSubmit={submitUser} className='row'>
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}

export default Form //export necessário para o formulário
