import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setHeroData,
	setError,
	clearErrors,
	setFormSubmitting,
	setFilterElement,
} from '../Actions/actions';
import { useServer } from '../Server/server';
import Filter from './FilterList';

const ELEMENT_OPTIONS = [
	{ value: 'fire', label: 'Огонь' },
	{ value: 'water', label: 'Вода' },
	{ value: 'wind', label: 'Ветер' },
	{ value: 'earth', label: 'Земля' },
];

const AddHeroes = ({ setShouldUpdate }) => {
	const dispatch = useDispatch();
	const heroData = useSelector(state => state.heroData);
	const errors = useSelector(state => state.errors);
	const formSubmitting = useSelector(state => state.formSubmitting);
	const fetchData = useServer();

	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch(setHeroData({ ...heroData, [name]: value }));
	};

	const handleFocus = (fieldName) => {
		dispatch(setError(fieldName, ''));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (!heroData.name.trim()) {
			newErrors.name = 'Введите имя';
		}
		if (!heroData.description.trim()) {
			newErrors.description = 'Введите описание';
		}
		if (!heroData.element.trim()) {
			newErrors.element = 'Выберите элемент';
		}

		if (newErrors.name) dispatch(setError('name', newErrors.name));
		if (newErrors.description) dispatch(setError('description', newErrors.description));
		if (newErrors.element) dispatch(setError('element', newErrors.element));

		if (Object.keys(newErrors).length > 0) {
			return;
		}

		try {
			dispatch(setFormSubmitting(true));
			await fetchData('http://localhost:3001/heroes', 'POST', JSON.stringify(heroData));
			dispatch(setHeroData({ name: '', description: '', element: '' }));
			dispatch(clearErrors());
			setShouldUpdate(true);
			dispatch(setFilterElement('all'));
		} catch (error) {
			console.error('Error while sending data: ', error);
		} finally {
			dispatch(setFormSubmitting(false));
		}
	};

	return (
		<section className="hero-form-section" aria-label="Добавить героя">
			<h3 className="hero-form-section__title">Новый герой</h3>
			<div className="hero-form-section__content">
				<form className="hero-form" onSubmit={handleSubmit}>
					<div className="form-field">
						<label className="form-field__label" htmlFor="hero-name">
							Имя
						</label>
						<input
							id="hero-name"
							className="input"
							type="text"
							name="name"
							value={heroData.name}
							onChange={handleChange}
							onFocus={() => handleFocus('name')}
							placeholder="Имя героя"
						/>
						{errors.name && <span className="form-field__error">{errors.name}</span>}
					</div>

					<div className="form-field">
						<label className="form-field__label" htmlFor="hero-description">
							Описание
						</label>
						<input
							id="hero-description"
							className="input"
							type="text"
							name="description"
							value={heroData.description}
							onChange={handleChange}
							onFocus={() => handleFocus('description')}
							placeholder="Краткое описание"
						/>
						{errors.description && (
							<span className="form-field__error">{errors.description}</span>
						)}
					</div>

					<div className="form-field">
						<label className="form-field__label" htmlFor="hero-element">
							Элемент
						</label>
						<select
							id="hero-element"
							className="input"
							name="element"
							value={heroData.element}
							onChange={handleChange}
							onFocus={() => handleFocus('element')}
						>
							<option value="">Выберите стихию</option>
							{ELEMENT_OPTIONS.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
						{errors.element && (
							<span className="form-field__error">{errors.element}</span>
						)}
					</div>

					<button type="submit" className="btn btn--primary" disabled={formSubmitting}>
						{formSubmitting ? 'Отправка...' : 'Добавить'}
					</button>
				</form>
				<Filter />
			</div>
		</section>
	);
};

export default AddHeroes;
