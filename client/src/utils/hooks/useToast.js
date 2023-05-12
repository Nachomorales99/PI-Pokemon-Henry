import { toast } from 'react-hot-toast';

const useToast = () => {
	const notify = (message, options) => {
		toast(message, options);
	};

	const success = (message, options) => {
		notify(message, {
			...options,
			icon: '✅',
			style: {
				borderRadius: '15px',
				background: 'rgba(173, 142, 112, 1)',
				color: '#fff',
			},
		});
	};

	const error = (message, options) => {
		notify(message, {
			...options,
			icon: '❌',
			style: {
				borderRadius: '15px',
				background: 'rgba(173, 142, 112, 1)',
				color: '#fff',
			},
		});
	};

	return { success, error };
};

export default useToast;
