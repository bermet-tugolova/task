import React, { useState } from 'react'
import './Questions.css'
import del from '../../icons/delete.png'
import plus from '../../icons/plus.png'
import { Select } from 'antd'
import { Checkbox } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { DeleteTwoTone } from '@ant-design/icons'
const { Option } = Select

export const Questions = ({ el, id, forms, setForms }) => {
	const [answers, setAnswers] = useState([])
	// функция для изменения значения в инпутах вопросов
	const onQuestionInputs = (el, e) => {
		const add = { ...forms[el], [e.target.name]: e.target.value }
		const before = forms.filter((_, i) => i < el)
		const after = forms.filter((_, i) => i > el)
		console.log(forms)
		const res = [...before, add, ...after]
		setForms(res)
	}

	// функция для удаления формы
	const onDelete = (el, id) => {
		const before = forms.filter((_, i) => i < el)
		const after = forms.filter((_, i) => i > el)
		setForms([...before, ...after])
	}

	// функция для изменения значения в инпутах ответов
	const onAnswerInputs = (el, e) => {
		const add = { ...answers[el], [e.target.name]: e.target.value }
		const before = answers.filter((_, i) => i < el)
		const after = answers.filter((_, i) => i > el)
		const res = [...before, add, ...after]
		setAnswers(res)
	}

	// добавление инпутов-ответов
	const addAnswer = (e) => {
		e.preventDefault() // отмена действия из-за form
		const add = [...answers] 
		add.push({ answer: '' })
		setAnswers(add)
		forms.filter((ques, id) => {
			return el.id === ques.id ? (el.answers = answers) : el
		})
	}
	return (
		<form>
			<div className='questions'>
				<div className='ques-header'>
					<strong>
						<em>#{id + 1}</em>
					</strong>
					<span>
						<button className='btn'>
							<CheckCircleTwoTone />
							<b> Save</b>
						</button>
						{/* e.preventDefault - чтобы страница не перезагружалась из-за <form></form> */}
						<button
							className='btn'
							onClick={(e) => {
								onDelete(id, el.id)
								e.preventDefault()
							}}
						>
							<DeleteTwoTone />
							<b> Delete</b>
						</button>
					</span>
				</div>
				<div className='q-textarea'>
					<p>Question</p>
					<textarea
						value={forms[id].question}
						name={`question`}
						id={`question${id}`}
						onChange={(e) => onQuestionInputs(id, e)}
						cols='65'
						rows='3'
					></textarea>
				</div>
				<div className='answType'>
					<p>Answer Type</p>
					<div className='sel-check'>
						<Select
							defaultValue='lucy'
							style={{ width: 460, border: '1px solid green' }}
						>
							<Option value='jack'>Jack</Option>
							<Option value='lucy'>Radio Buttons</Option>
						</Select>
						<Checkbox style={{ paddingTop: '10px' }}>
							Require Answer
						</Checkbox>
					</div>
				</div>
				{el.answers.map((el, id) => {
					return (
						<div className='answer' key={id}>
							<p>
								Answer <strong> #{id + 1}</strong>
							</p>
							<div>
								<input
									type='text'
									className='inpAnswer'
									value={answers[id].answer}
									name={`answer`}
									id={`question${id}`}
									onChange={(e) => onAnswerInputs(id, e)}
								/>
								<img src={del} alt='deleteIcon' />
							</div>
						</div>
					)
				})}

				<div className='addAnsw'>
					<button className='addAnsw btn' onClick={addAnswer}>
						<img src={plus} alt='plus' />
						<strong>Add another answer</strong>
					</button>
				</div>
			</div>
		</form>
	)
}
