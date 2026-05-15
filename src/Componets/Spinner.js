import './Spinner.css';

const Spinner = () => (
	<div className="spinner-wrapper" role="status" aria-label="Загрузка">
		<div className="spinner" />
		<span className="spinner__sr-only">Загрузка...</span>
	</div>
);

export default Spinner;
