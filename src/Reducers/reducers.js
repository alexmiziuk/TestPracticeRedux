/* Редьюсеры (Reducers):
В файле reducers.js определен корневой редьюсер, который объединяет
 все остальные редьюсеры. Он пока что содержит только один редьюсер 
 counterReducer, который управляет состоянием счетчика. */

/* В представленном коде определен редьюсер `counterReducer`, который является частью управления 
состоянием в Redux. Давайте разберем, как он работает и как Redux используется в этом компоненте:

1. **Инициализация начального состояния**:
  - В начале файла определен объект `initialState`, который содержит начальное состояние.
	В данном случае, это объект с единственным свойством `count`, инициализированным значением `0`.

2. **Определение редьюсера**:
  - Функция `counterReducer` принимает два параметра: `state` (текущее состояние) и `
  action` (действие, которое будет выполнено).
  - Внутри функции используется оператор `switch`, чтобы определить, какое действие было выполнено.
  - Для каждого типа действия (в данном случае, `'INCREMENT'`, `'DECREMENT'`, `'SET_RANDOM'`) 
  определены соответствующие обновления состояния.
  - В случае типа действия `'INCREMENT'`, значение `count` в состоянии увеличивается на 1.
  - В случае типа действия `'DECREMENT'`, значение `count` в состоянии уменьшается на 1.
  - В случае типа действия `'SET_RANDOM'`, значение `count` в состоянии устанавливается на случайное число от 0 до 99.

3. **Возвращение нового состояния**:
  - После выполнения действия, редьюсер возвращает новый объект состояния. В Redux не происходит 
  изменения состояния напрямую, а вместо этого каждый раз, когда состояние нуждается в обновлении, создается
	и возвращается новый объект, основанный на предыдущем состоянии.
  - Для этого используется оператор расширения (`...state`), чтобы скопировать предыдущее состояние, 
  а затем изменить только необходимую часть состояния в соответствии с выполненным действием.

4. **Обработка неизвестных действий**:
  - Если переданный тип действия не совпадает ни с одним из определенных в `switch` операторе, 
  редьюсер просто возвращает текущее состояние без изменений.

5. **Экспорт редьюсера**:
  - В конце файла редьюсер экспортируется по умолчанию, чтобы он мог быть использован в других частях приложения.

Этот редьюсер определяет, как будет изменяться состояние приложения в ответ на действия, отправленные 
в Redux-хранилище. В вашем приложении этот редьюсер будет связан с компонентом `Counter`, который будет
использовать его для обновления и отображения данных о счетчике. */


// counterReducer.js
const initialState = {
	count: 0,
	heroes: [],
	heroData: {
		name: '',
		description: '',
		element: ''
	},
	errors: {
		name: '',
		description: '',
		element: ''
	},
	shouldUpdate: false, // Добавляем shouldUpdate в начальное состояние
	loading: true, // Начальное состояние загрузки
};

const counterReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { ...state, count: state.count + 1 };
		case 'DECREMENT':
			return { ...state, count: state.count - 1 };
		case 'SET_RANDOM':
			return { ...state, count: Math.floor(Math.random() * 100) };
		case 'SET_HEROES':
			return { ...state, heroes: action.payload };
		case 'SET_HERO_DATA':
			return { ...state, heroData: action.payload };
		case 'SET_ERROR':
			return {
				...state,
				errors: {
					...state.errors,
					[action.payload.field]: action.payload.message
				}
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				errors: {
					name: '',
					description: '',
					element: ''
				}
			};
			case 'SET_SHOULD_UPDATE':
      return {
        ...state,
        shouldUpdate: action.payload
			};
			case 'DELETE_HERO':
            // Удаление героя из массива по ID
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload)
			};
			case 'SET_FILTER_ELEMENT':
				return {
					 ...state,
					 filterElement: action.payload
			};
			case 'SET_LOADING':
				return {
				  ...state,
				  loading: action.payload, // Обновляем состояние загрузки
				};
		default:
			return state;
	}
};

export default counterReducer;



