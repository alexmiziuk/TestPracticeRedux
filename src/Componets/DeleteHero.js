import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHero, setLoading } from '../Actions/actions';
import { useServer } from '../Server/server';
import Spinner from './Spinner';

const DeleteHero = ({ heroId }) => {
	const dispatch = useDispatch();
	const fetchData = useServer(); // Используем компонент useServer для отправки запроса на сервер
	const loading = useSelector(state => state.loading); // Получаем состояние загрузки из Redux Store

	const handleDelete = async () => {
		try {
			// Устанавливаем состояние загрузки в хранилище Redux
			dispatch(setLoading(true));
			// Отправляем запрос на удаление героя
			await fetchData(`http://localhost:3001/heroes/${heroId}`, 'DELETE');

			// Если удаление успешно, отправляем действие для обновления состояния Redux
			dispatch(deleteHero(heroId));
		} catch (error) {
			console.error('Error deleting hero:', error);
			// Обработка ошибки удаления, если необходимо
		}
		finally {
			// Устанавливаем состояние загрузки в хранилище Redux
			dispatch(setLoading(false));
		}
	};

	return (
		<>
		{loading ? (
			 <Spinner /> // Показываем спиннер во время загрузки данных
		) : (
			 <button onClick={handleDelete}>X</button>
		)}
  </>
	);
};

export default DeleteHero;




