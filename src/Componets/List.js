// List.js
import { useServer } from '../Server/server';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Импортируем необходимые хуки
import { setHeroes, setShouldUpdate, setLoading } from '../Actions/actions'; // Предполагаемый action creator
import AddHerous from './AddHerous';
import Button from './DeleteHero';
import Spinner from './Spinner'; // Импортируем компонент Spinner


const List = () => {
	const fetchData = useServer();
	const dispatch = useDispatch(); // Получаем функцию диспетча
	const shouldUpdate = useSelector(state => state.shouldUpdate); // Флаг для обновления данных
	const loading = useSelector(state => state.loading); // Получаем состояние загрузки из Redux
	useEffect(() => {
		// Устанавливаем состояние загрузки в true перед запросом данных
		dispatch(setLoading(true));
		// Проверяем, нужно ли обновить данные
		if (shouldUpdate) {
			// Сбрасываем флаг shouldUpdate
			dispatch(setShouldUpdate(false));
		}
		
		// Загружаем данные с сервера
		fetchData('http://localhost:3001/heroes')
			.then(data => {
				if (!data) {
					console.log('Произошла ошибка: No data received');
					return;
				}
				console.log(data);

				dispatch(setHeroes(data)); // Отправляем данные в хранилище Redux
			})
			.catch(error => {
				console.log('Произошла ошибка:', error);
			})
			.finally(() => {
				dispatch(setLoading(false)); // После завершения загрузки данных устанавливаем состояние загрузки в false
		  });
	}, [fetchData, dispatch, shouldUpdate]); // Добавляем shouldUpdate в зависимости useEffect

	let heroes = useSelector(state => {

		const filterElement = state.filterElement;

		if (!filterElement || filterElement === 'all') {
			return state.heroes;
		} else {
			// Фильтруем героев по выбранному элементу
			const filteredHeroes = state.heroes.filter(hero => hero.element === filterElement);

			// Проверяем, есть ли герои с данным элементом
			if (filteredHeroes.length === 0) {
				// Если нет, возвращаем сообщение
				return <div>Нет героев с элементом "{filterElement}" в списке</div>;
			} else {
				// Если есть, возвращаем отфильтрованный список героев
				return filteredHeroes;
			}
		}
	});


	// Если фильтры еще не были применены, показываем все героев из локального состояния

	return (
		<section>
			{loading ? (
				<Spinner /> // Показываем спиннер во время загрузки данных
			) : (
				<ul>
					{Array.isArray(heroes) ? (
						heroes.map(hero => (
							<li key={hero.id}>
								<div>
									<h2>{hero.name}</h2>
									<p>{hero.description}</p>
									<p>{hero.element}</p>
								</div>
								<Button heroId={hero.id} />
							</li>
						))
					) : (
						<li>{heroes}</li>
					)}
				</ul>
			)}
			<AddHerous setShouldUpdate={value => dispatch(setShouldUpdate(value))} />
		</section>
	);
};

export default List;

