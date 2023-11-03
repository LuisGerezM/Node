import { useCalendarStore, useUiStore } from '@/hooks';
import { useSelector } from 'react-redux';
import { addHours } from 'date-fns';

export const FabAddNew = () => {
	const { user } = useSelector(state => state.auth);
	const { toggleDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const handleClickNew = () => {
		setActiveEvent({
			title: '',
			notes: '',
			start: new Date(),
			end: addHours(new Date(), 2), 
			bgColor: '#fafafa',
			user,
		});
		toggleDateModal();
	};

	return (
		<button className='btn btn-primary fab' onClick={handleClickNew} style={{ zIndex: '10' }}>
			<i className='fas fa-plus'></i>
		</button>
	);
};
