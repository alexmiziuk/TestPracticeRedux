/* Действия (Actions):
В файле actions.js определены действия, которые могут быть выполнены 
в приложении: increment, decrement и setRandom. Эти действия представляют собой простые 
объекты, которые содержат типы (например, 'INCREMENT') и иногда дополнительные данные. */

/* В данном коде определены три функции, которые представляют собой действия (actions) в Redux. Давайте разберем,
 как они взаимодействуют с Redux:

1. **Функции действий (Actions)**:
   - Каждая функция (`increment`, `decrement`, `setRandom`) представляет собой действие в Redux.
   - Действия в Redux - это объекты, которые обычно содержат тип (`type`) и иногда дополнительные 
	данные, необходимые для обновления состояния приложения.
   - В данном случае, эти функции возвращают объекты, в которых только одно свойство - `type`, 
	указывающее на тип действия, который нужно выполнить.

2. **Типы действий (Action Types)**:
   - Тип действия - это строковая константа, которая описывает, какое конкретное действие необходимо выполнить.
   - В данном коде типы действий `'INCREMENT'`, `'DECREMENT'` и `'SET_RANDOM'` используются для идентификации 
	различных действий, таких как увеличение счетчика, уменьшение счетчика и установка случайного значения счетчика соответственно.

3. **Возврат объектов действий**:
   - Каждая функция действия возвращает объект с ключом `type`, указывающим тип действия.
   - Например, функция `increment` возвращает объект `{ type: 'INCREMENT' }`. Этот объект представляет
	 собой действие увеличения счетчика.

4. **Использование действий**:
   - Для выполнения действия, определенного в функциях `increment`, `decrement`, `setRandom`, 
	эти функции вызываются из компонентов React, например, из компонента `Counter`.
   - Когда вызывается одна из этих функций, создается объект действия с соответствующим типом, 
	и этот объект передается в Redux-хранилище с помощью функции `dispatch`.

В целом, функции действий (`increment`, `decrement`, `setRandom`) предоставляют удобный способ создания объектов 
действий в Redux. Когда эти действия отправляются в Redux-хранилище через функцию `dispatch`, редьюсеры могут их 
обработать и обновить состояние приложения в соответствии с логикой, определенной в них. */
export const increment = () => {
	return { type: 'INCREMENT' };
};
 
export const decrement = () => {
	return { type: 'DECREMENT' };
};
 
export const setRandom = () => {
	return { type: 'SET_RANDOM' };
};

export const setHeroes = (heroes) => {
	return { type: 'SET_HEROES', payload: heroes };
};

export const setHeroData = (heroData) => {
	return { type: 'SET_HERO_DATA', payload: heroData };
};

export const clearErrors = () => {
	return { type: 'CLEAR_ERRORS' };
};

// Export setError action
export const setError = (field, message) => {
	return { type: 'SET_ERROR', payload: { field, message } };
};

// actions.js
export const setShouldUpdate = (value) => {
	return {
	  type: 'SET_SHOULD_UPDATE',
	  payload: value
	};
 };
 
export const deleteHero = (id) => { 
	return { type: 'DELETE_HERO', payload: id };
}

export const setFilterElement = (element) => {
	return {
		 type: 'SET_FILTER_ELEMENT',
		 payload: element
	};
};

export const setLoading = (isLoading) => {
	return {
		 type: 'SET_LOADING',
		 payload: isLoading
	};
}