import React from 'react'
import './Details.css'
import { Select } from 'antd'

const { Option } = Select

export const Details = ({
	title,
	setTitle,
	category,
	setCategory,
	country,
	setCountry,
	city,
	setCity,
}) => {
	return (
		<form>
			<h1 className='zag'>Details</h1>
			<div className='details'>
				<div className='q-textarea'>
					<p>Title</p>
					<input
						type='text'
						className='inpTitle'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='category'>
					<p>Category</p>
					<div className='sel-check'>
						<Select
							onChange={(e) => setCategory(e.target.value)}
							defaultValue='Select a Category'
							style={{ width: 440 }}
						>
							<Option value='IT'>
								IT
							</Option>
							<Option value='Select a Category'>
								Select a Category
							</Option>
						</Select>
					</div>
				</div>
				<div className='q-textarea'>
					<p>Country</p>
					<Select
						onChange={(e) => setCountry(e.target.value)}
						defaultValue='Select a Country'
						style={{ width: 440 }}
					>
						<Option value='Kyrgyzstan'>Kyrgyzstan</Option>
						<Option value='Select a Country'>Select a Country</Option>
					</Select>
				</div>
				<div className='q-textarea'>
					<p>City</p>
					<input
						value={city}
						onChange={(e) => setCity(e.target.value)}
						type='text'
						className='inpTitle'
					/>
				</div>
			</div>
		</form>
	)
}
