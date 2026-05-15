import React from 'react';
import Counter from '../Counter';
import List from '../List';

function App() {
	return (
		<div className="app">
			<header className="app__header">
				<h1 className="app__title">Реестр героев</h1>
				<p className="app__subtitle">Счётчик, список и фильтр по стихиям</p>
			</header>
			<main className="app__main">
				<Counter />
				<List />
			</main>
		</div>
	);
}

export default App;
