import { act, renderHook } from '@testing-library/react';

import { Provider } from 'react-redux';

import { useUiStore } from '@/hooks/useUiStore';
import { getUiStoreMock } from '../__mocks__/getUiStore.mock';

describe('Pruebas en el useUiStore', () => {
	test('Debe regresar los valores por defecto', () => {
		const mockStore = getUiStoreMock({ isDateModalOpen: false });

		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		expect(result.current).toEqual({
			isDateModalOpen: false,
			toggleDateModal: expect.any(Function),
		});
	});

	test('toggleDateModal debe colocar true en isDateModalOpen', () => {
		const mockStore = getUiStoreMock({ isDateModalOpen: false });

		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		const { toggleDateModal } = result.current;

		act(() => toggleDateModal());

		expect(result.current.isDateModalOpen).toBeTruthy();
	});

	test('toggleDateModal debe colocar false en isDateModalOpen', () => {
		const mockStore = getUiStoreMock({ isDateModalOpen: true });

		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		act(() => result.current.toggleDateModal());

		expect(result.current.isDateModalOpen).toBeFalsy();
	});

	test('toggleDateModal debe cambiar el estado', () => {
		const mockStore = getUiStoreMock({ isDateModalOpen: true });

		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
		});

		act(() => result.current.toggleDateModal());

		expect(result.current.isDateModalOpen).toBeFalsy();

		act(() => result.current.toggleDateModal());

		expect(result.current.isDateModalOpen).toBeTruthy();
	});
});
