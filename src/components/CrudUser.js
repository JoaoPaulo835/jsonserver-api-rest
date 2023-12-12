import React, { useState, useEffect } from "react" //imports do usestate e o useeffect 
import Form from "./Form"
import Table from "./Table"

import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {//primeiro componente crudUser 
	const [users, setUsers] = useState(null) //nessa etapa se mantém o estado que se incia com 'null'.

	const url = "http://localhost:5000/users" // apresenta o localhost da url
	const api = httpHelper() 

	useEffect(() => {//Usa o useEffect para chamar a função getUsers.
		getUsers()
	}, [])

	const postUser = user => { //função criada para criar o usuário
		api
			.post(`${url}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const updateUser = (id, user) => { //função criada para atualizar o usuário
		api
			.put(`${url}/${id}`, { body: user })
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const deleteUser = id => { //função criada para deletar usuário
		api
			.del(`${url}/${id}`, {})
			.then(res => getUsers())
			.catch(err => console.log(err))
	}

	const getUsers = () => { //função criada para pegar usuário, obter. 
		api
			.get(`${url}?_expand=companies`)
			.then(res => {
				setUsers(res)
			})
			.catch(err => console.log(err))
	}

	if (!users) return null //se o estado de users for nulo, retorna null

		//nessa etapa insere novos usuários e consequentemente utiliza as outras funções citadas anteriormente
	return (
		<>
			<h3>New user</h3>
			<Form postUser={postUser} />
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
		</>
	)
}

export default CrudUser
