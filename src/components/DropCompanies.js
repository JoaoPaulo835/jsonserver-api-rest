import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"
//realização dos imports necessários do react

const DropCompanies = ({ companiesId, handleValue }) => { //DropCompanies aceita duas props companiesId e handleValue
	const [companies, setCompanies] = useState(null) //o useState mantém o estado de companies 
	const [company, setCompany] = useState(companiesId) //bem como o estado na company

	const url = "http://localhost:5000/companies" //local da url
	const api = httpHelper() //instancia o objeto api com o httpHelper

	useEffect(() => {//Usa o hook useEffect para chamar a função quando o componente é montado
		api
			.get(url)//pega  a url
			.then(res => {
				setCompanies([{ id: 0, name: "Select Company" }, ...res])
			})
			.catch(err => console.log(err)) //caso pegue, imprime o err
	}, [])

	if (!companies) return null //se for diferente de companie retorna nulo

	return (
		<select
			name='companiesId' //retorna a seleção com o nome da company
			value={company} // a company em si que está sendo selecionada
			onChange={e => {
				setCompany(e.target.value)
				handleValue(e)
			}}
		>
			{companies.map(c => ( //mapeia a company selecionada
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

export default DropCompanies //faz a exportação de DropCompanies
