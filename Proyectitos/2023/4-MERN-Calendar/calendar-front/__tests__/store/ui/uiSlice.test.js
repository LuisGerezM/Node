import { uiSlice } from '@/store/ui/uiSlice';
import { onOpenDateModal, onCloseDateModal } from '@/store/ui/uiSlice';

describe('Pruebas en uiSlice', () => {
	test('Debe regresar el estado por fefecto', () => {
		expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
	});

	test('Debe cambiar el isDateModalOpen correctamente', () => {
		let state = uiSlice.getInitialState();
		state = uiSlice.reducer(state, onOpenDateModal());

		expect(state.isDateModalOpen).toBeTruthy();

		state = uiSlice.reducer(state, onCloseDateModal());

		expect(state.isDateModalOpen).toBeFalsy();
	});
});
