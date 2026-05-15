import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterElement } from '../Actions/actions';

const FILTERS = [
	{ id: 'all', label: 'Все', className: 'filter-btn--all' },
	{ id: 'fire', label: 'Огонь', className: 'filter-btn--fire' },
	{ id: 'water', label: 'Вода', className: 'filter-btn--water' },
	{ id: 'wind', label: 'Ветер', className: 'filter-btn--wind' },
	{ id: 'earth', label: 'Земля', className: 'filter-btn--earth' },
];

const FilterList = () => {
	const dispatch = useDispatch();
	const filterElement = useSelector(state => state.filterElement || 'all');

	const handleFilterClick = (element) => {
		dispatch(setFilterElement(element));
	};

	return (
		<div className="filter-group" role="group" aria-label="Фильтр по элементу">
			<span className="filter-group__label">Фильтр</span>
			<div className="filter-group__buttons">
				{FILTERS.map(({ id, label, className }) => (
					<button
						key={id}
						type="button"
						className={`filter-btn ${className}${filterElement === id ? ' is-active' : ''}`}
						onClick={() => handleFilterClick(id)}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	);
};

export default FilterList;
