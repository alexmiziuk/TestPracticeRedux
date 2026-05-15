import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setRandom } from '../Actions/actions';

const Counter = () => {
	const count = useSelector(state => state.count);
	const dispatch = useDispatch();

	return (
		<section className="counter-panel" aria-label="Счётчик">
			<h2 className="counter-panel__value">
				Счётчик: <span>{count}</span>
			</h2>
			<div className="counter-panel__actions">
				<button type="button" className="btn btn--primary" onClick={() => dispatch(increment())}>
					Увеличить
				</button>
				<button type="button" className="btn" onClick={() => dispatch(decrement())}>
					Уменьшить
				</button>
				<button type="button" className="btn btn--ghost" onClick={() => dispatch(setRandom())}>
					Случайное значение
				</button>
			</div>
		</section>
	);
};

export default Counter;
