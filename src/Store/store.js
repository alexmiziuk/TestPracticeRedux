/* Настройка хранилища (Store):
В файле store.js мы импортируем функцию configureStore из библиотеки @reduxjs/toolkit,
 а также корневой редьюсер rootReducer из файла reducers.js.
 Мы используем configureStore, чтобы создать Redux-хранилище, 
 передавая ему корневой редьюсер. */

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducers/reducers';

const store = configureStore({
	reducer: rootReducer
});

export default store;


