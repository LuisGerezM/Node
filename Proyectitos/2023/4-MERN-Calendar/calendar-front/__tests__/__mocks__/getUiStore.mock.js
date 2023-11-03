import { configureStore } from '@reduxjs/toolkit';

import { uiSlice } from '@/store/ui/uiSlice';

export const getUiStoreMock = initialState => {
	return configureStore({
		reducer: {
			ui: uiSlice.reducer,
		},
		preloadedState: {
			ui: { ...initialState },
		},
	});
};