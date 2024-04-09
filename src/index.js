/* Главный компонент (Main Component):
В файле App.js определен главный компонент App, который является корневым компонентом 
нашего приложения. Он обертывает Counter в компонент Provider из библиотеки react-redux, 
чтобы предоставить доступ к Redux-хранилищу всему дереву компонентов React. */

/* 
Компонент App в вашем примере представляет собой корневой компонент вашего приложения React.
 Давайте разберем, как он взаимодействует с Redux:

<Provider store={store}>:

Этот компонент Provider предоставляется из пакета react-redux и используется для обеспечения доступа
 к Redux-хранилищу (store) всему дереву компонентов в приложении.
Атрибут store предоставляет само Redux-хранилище, которое мы создали в файле store.js.
 Это позволяет всем компонентам внутри <Provider> обращаться к состоянию, хранящемуся в Redux-хранилище,
  и отправлять действия для его изменения.
<Counter />:

Это компонент Counter, который является дочерним компонентом <Provider>. 
Это значит, что он также имеет доступ к Redux-хранилищу через контекст, предоставляемый Provider.
Когда вы оборачиваете ваше приложение в <Provider store={store}>, вы делаете доступным Redux-хранилище 
для всех компонентов внутри этого провайдера. Это позволяет использовать функции useSelector
 и useDispatch из react-redux в любом из ваших компонентов, чтобы получить доступ к состоянию хранилища
  и отправить действия Redux для его изменения, как это происходит в компоненте Counter.

Таким образом, компонент App действует как контейнер, который обеспечивает доступ
 к Redux-хранилищу для всего приложения, а компонент Counter, в свою очередь, может использовать
  этот доступ для управления состоянием и отображения данных в соответствии с этим состоянием. */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Componets/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store/store';// Assuming you have a store file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
