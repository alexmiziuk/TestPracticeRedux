import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHero, setDeletingHeroId } from '../Actions/actions';
import { useServer } from '../Server/server';

const DeleteHero = ({ heroId }) => {
	const dispatch = useDispatch();
	const fetchData = useServer();
	const deletingHeroId = useSelector(state => state.deletingHeroId);
	const isDeleting = String(deletingHeroId) === String(heroId);

	const handleDelete = async () => {
		try {
			dispatch(setDeletingHeroId(heroId));
			await fetchData(`http://localhost:3001/heroes/${heroId}`, 'DELETE');
			dispatch(deleteHero(heroId));
		} catch (error) {
			console.error('Error deleting hero:', error);
		} finally {
			dispatch(setDeletingHeroId(null));
		}
	};

	return (
		<button
			type="button"
			className="btn btn--danger btn--icon"
			onClick={handleDelete}
			disabled={isDeleting}
			aria-label="Удалить героя"
			title="Удалить"
		>
			{isDeleting ? '…' : '×'}
		</button>
	);
};

export default DeleteHero;
