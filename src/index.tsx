import 'csshake/dist/csshake.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Game from './game';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Game />,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
