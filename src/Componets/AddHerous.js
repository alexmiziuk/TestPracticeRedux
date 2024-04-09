import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeroData, setError, clearErrors, setLoading } from '../Actions/actions';
import { useServer } from '../Server/server';
import { setFilterElement } from '../Actions/actions'; // Импортируем action creator для сброса фильтра
import Filter from './FilterList';
import Spinner from './Spinner';


const AddHeroes = ({ setShouldUpdate }) => {
	const dispatch = useDispatch();
	const heroData = useSelector(state => state.heroData);
	const errors = useSelector(state => state.errors);
	const loading = useSelector(state => state.loading); // Получаем состояние загрузки из Redux Store

	const fetchData = useServer(); // Создайте экземпляр fetchData из useServer


	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch(setHeroData({ ...heroData, [name]: value }));
	};

	const handleFocus = (fieldName) => {
		// Очищаем ошибки только для текущего поля
		dispatch(setError(fieldName, ''));
	};

	const handleSubmit = async (event) => { // Используйте async, так как fetchData асинхронен
		event.preventDefault();

		// Проверяем данные перед отправкой на сервер
		const newErrors = {};

		// Проверяем каждое поле на заполненность
		if (!heroData.name.trim()) {
			newErrors.name = 'Name is required'; // Устанавливаем ошибку, если имя не введено
		}
		if (!heroData.description.trim()) {
			newErrors.description = 'Description is required'; // Устанавливаем ошибку, если описание не введено
		}
		if (!heroData.element.trim()) {
			newErrors.element = 'Element is required'; // Устанавливаем ошибку, если элемент не введен
		}

		// Устанавливаем сообщения об ошибках для каждого поля отдельно
		if (newErrors.name) {
			dispatch(setError('name', newErrors.name));
		}
		if (newErrors.description) {
			dispatch(setError('description', newErrors.description));
		}
		if (newErrors.element) {
			dispatch(setError('element', newErrors.element));
		}

		// Если есть хотя бы одна ошибка, завершаем выполнение функции
		if (Object.keys(newErrors).length > 0) {
			return;
		}

		// Ваши дальнейшие действия, например, отправка данных на сервер
		console.log(heroData);
		try {
			// Устанавливаем состояние загрузки в хранилище Redux
			dispatch(setLoading(true));
			// Отправляем данные на сервер
			await fetchData('http://localhost:3001/heroes', 'POST', JSON.stringify(heroData));

			// Очищаем форму и ошибки после успешной отправки
			dispatch(setHeroData({ name: '', description: '', element: '' }));
			dispatch(clearErrors());

			setShouldUpdate(true); // Обновляем компонент
			dispatch(setFilterElement('all')); // Сбрасываем фильтр элемента в "Все"

			// Сбрасываем флаг shouldUpdate обратно в false
			/*   setTimeout(() => {
				dispatch(setShouldUpdate(false));
		  }, 100); */

		} catch (error) {
			console.error('Error while sending data: ', error);
			// Добавьте обработку ошибок, если необходимо
		}
		finally {
			// Очищаем форму и ошибки после успешной отправки
			dispatch(setHeroData({ name: '', description: '', element: '' }));
			dispatch(clearErrors());
			// Устанавливаем состояние загрузки в хранилище Redux
			dispatch(setLoading(false));
		}
	};

	return (
		<section style={{ display: 'flex', flexDirection: 'row', padding: '20px' }}>
			{loading ? (
			 <Spinner /> // Показываем спиннер во время загрузки данных
		) : (
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
				<div>
					<input
						type="text"
						name="name"
						value={heroData.name}
						onChange={handleChange}
						onFocus={() => handleFocus('name')} // Очищаем ошибки при фокусировке на поле и скрываем сообщение об ошибке для этого поля
						placeholder="Name"
						style={{ marginRight: '10px' }}
					/>
					{errors.name && <div style={{ fontSize: '10px' }} className="error">{errors.name}</div>}
				</div>
				<div>
					<input
						type="text"
						name="description"
						value={heroData.description}
						onChange={handleChange}
						onFocus={() => handleFocus('description')} // Очищаем ошибки при фокусировке на поле и скрываем сообщение об ошибке для этого поля
						placeholder="Description"
						style={{ marginRight: '10px' }}
					/>
					{errors.description && <div style={{ fontSize: '10px' }} className="error">{errors.description}</div>}
				</div>
				<div>
					<input
						type="text"
						name="element"
						value={heroData.element}
						onChange={handleChange}
						onFocus={() => handleFocus('element')} // Очищаем ошибки при фокусировке на поле и скрываем сообщение об ошибке для этого поля
						placeholder="Element"
						style={{ marginRight: '10px' }}
					/>
					{errors.element && <div style={{ fontSize: '10px' }} className="error">{errors.element}</div>}
				</div>
				<button type="submit">Добавить</button>
			</form>
					)}
			<Filter />
		</section>
	);
};

export default AddHeroes;






