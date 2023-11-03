import Swal from 'sweetalert2';

export const userFeedbackMsg = ({ title, subTitle, icon }) => Swal.fire(title, subTitle, icon);
