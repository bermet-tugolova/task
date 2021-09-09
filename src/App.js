import './App.css'
import { Questions } from './components/Questions'
import { Details } from './components/Details'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import { useState } from 'react'

export function App() {
	const [count, setCount] = useState(1) // для айдишек
	const [forms, setForms] = useState([]) // для форм

	// details
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')

	const addForms = () => {
		// 2 варианта записи
		// const add = [...forms]
		// add.push({ question: '', answers: [], id: count })
		// setForms(add)
		setCount(count + 1)
		setForms([
			...forms,
			{
				question: '',
				answers: [],
				id: count,
			},
		])
	}

	const onSubmit = async () => {
		const body = {
			title,
			category,
			country,
			city,
			forms,
		}
		const response = await fetch('https://domain.com/spa/sunrise/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
		// const result = await response.json()
		await response.json()
	}
	const test = () => {
		let validate = /^([а-яё]+|[a-z]+)$/i // регулярка только для русс/англ букв
		if (validate.test(title) && validate.test(city)) {
			// если title и city прошли проверку на регулярку,
			onSubmit() // то сработает onSubmit
		} else {
			// а если нет,то сработает этот алерт
			alert('Введите только русские/английские буквы!Цифр не должно быть')
		}
	}
	return (
		<div className='App'>
			<div className='container'>
				<Details
					title={title}
					setTitle={setTitle}
					category={category}
					setCategory={setCategory}
					country={country}
					setCountry={setCountry}
					city={city}
					setCity={setCity}
				/>

				<h1 className='zag'>Questions</h1>
				{forms.map((el, id) => {
					return (
						<Questions
							setForms={setForms}
							forms={forms}
							el={el}
							key={id}
							id={id}
						/>
					)
				})}
				<div className='btn-group'>
					<Button onClick={addForms} type='primary'>
						Add a Question
					</Button>
					{/* если формы еще нет,то кнопки отправить не будет,
					а если уже есть хоть одна форма,то эта кнопка будет видна */}
					{forms.length ? (
						<button onClick={test} className='submit'>
							Submit
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}
