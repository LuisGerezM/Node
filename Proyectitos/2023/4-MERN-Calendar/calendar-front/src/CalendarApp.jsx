import { Provider } from 'react-redux';

import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { store } from './store';

export function CalendarApp() {
	return (
		<Provider store={store}>
			<HashRouter>
				<AppRouter />
			</HashRouter>
		</Provider>
	);
}
