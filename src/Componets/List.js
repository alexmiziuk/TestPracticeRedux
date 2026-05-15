import { useServer } from '../Server/server';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHeroes, setShouldUpdate, setHeroesLoading } from '../Actions/actions';
import { getElementBadgeClass, getElementLabel } from '../utils/elementClass';
import AddHerous from './AddHerous';
import DeleteHero from './DeleteHero';
import Spinner from './Spinner';

const List = () => {
	const fetchData = useServer();
	const dispatch = useDispatch();
	const shouldUpdate = useSelector(state => state.shouldUpdate);
	const heroesLoading = useSelector(state => state.heroesLoading);

	useEffect(() => {
		dispatch(setHeroesLoading(true));
		if (shouldUpdate) {
			dispatch(setShouldUpdate(false));
		}

		fetchData('http://localhost:3001/heroes')
			.then(data => {
				if (!data) {
					return;
				}
				dispatch(setHeroes(data));
			})
			.catch(error => {
				console.log('Произошла ошибка:', error);
			})
			.finally(() => {
				dispatch(setHeroesLoading(false));
			});
	}, [fetchData, dispatch, shouldUpdate]);

	const filterElement = useSelector(state => state.filterElement);
	const filteredHeroes = useSelector(state => {
		if (!state.filterElement || state.filterElement === 'all') {
			return state.heroes;
		}
		return state.heroes.filter(hero => hero.element === state.filterElement);
	});

	const isFilterEmpty =
		filterElement &&
		filterElement !== 'all' &&
		filteredHeroes.length === 0;

	return (
		<section className="heroes-section" aria-label="Список героев">
			<h2 className="section-title">Список героев</h2>

			{heroesLoading ? (
				<Spinner />
			) : isFilterEmpty ? (
				<p className="empty-state">
					Нет героев с элементом «{getElementLabel(filterElement)}» в списке
				</p>
			) : (
				<ul className="hero-list">
					{filteredHeroes.map(hero => (
						<li key={hero.id} className="hero-card">
							<div className="hero-card__body">
								<h3 className="hero-card__name">{hero.name}</h3>
								<p className="hero-card__description">{hero.description}</p>
								<span className={`badge ${getElementBadgeClass(hero.element)}`}>
									{getElementLabel(hero.element)}
								</span>
							</div>
							<DeleteHero heroId={hero.id} />
						</li>
					))}
				</ul>
			)}

			<AddHerous setShouldUpdate={value => dispatch(setShouldUpdate(value))} />
		</section>
	);
};

export default List;
