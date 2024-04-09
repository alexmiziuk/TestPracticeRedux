// Filter.js
import React from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { setFilterElement, setLoading } from '../Actions/actions';
import { useServer } from '../Server/server';
import Spinner from './Spinner';


const FilterList = () => {
	const dispatch = useDispatch();
	const fetchData = useServer(); // Используем хук для отправки запросов на сервер
	const loading = useSelector(state => state.loading); // Получаем состояние загрузки из Redux Store
	

	const handleFilterClick = async (element) => {
		try {
			// Устанавливаем состояние загрузки в хранилище Redux
			dispatch(setLoading(true));
			// Отправляем запрос на сервер для получения героев с заданным элементом
			await fetchData(`http://localhost:3001/heroes?element=${element}`);

			// Устанавливаем фильтр элемента в хранилище Redux
			dispatch(setFilterElement(element));
		} catch (error) {
			console.error('Error fetching filtered heroes:', error);
			// Обработка ошибки, если необходимо
		}
		finally {
			// Устанавливаем состояние загрузки в хранилище Redux
			dispatch(setLoading(false));
		}
	};

	return (
		<div>
		{loading ? (
			 <Spinner /> // Показываем спиннер во время загрузки данных
		) : (
		<>
			 <button onClick={() => handleFilterClick('all')}>Все</button>
			 <button onClick={() => handleFilterClick('fire')}>Огонь</button>
			 <button onClick={() => handleFilterClick('water')}>Вода</button>
			 <button onClick={() => handleFilterClick('wind')}>Ветер</button>
			 <button onClick={() => handleFilterClick('earth')}>Земля</button>
		</>
		)}
  </div>
	);
};

export default FilterList;
