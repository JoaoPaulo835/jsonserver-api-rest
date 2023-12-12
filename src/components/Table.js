import React from "react"
import Form from "./Form"
//imports do react necessários

const Table = ({ users, postUser, updateUser, deleteUser }) => { //a tabela aceita o usuário, atualização e delete
	const showUpdateUser = id => {
		const form = document.getElementsByClassName(`show-form-${id}`) //se baseia no id do usuário
		form[0].classList.toggle("hide-form")
	}

	const Row = ({ user }) => { // o row organiza as informaçoes solicitadas como: nome, email, telefone, nome da company.
		return (
			<>
				<div className='row'>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					<div>{user.companies.name}</div>
					<div className='buttons'>
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}
// retorna a tabela com as informações citadas
	return (
		<div className='table'>
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			<div className='rows'>
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}
//esse mapeamento se dá com o id
export default Table//aqui tem o export da tabela
