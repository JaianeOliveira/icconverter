import { Alert } from '@material-tailwind/react';
import { colors } from '@material-tailwind/react/types/generic';

export type NotificationTypes = 'message' | 'error' | 'warning' | 'success';

type NotificationProps = {
	message: string | undefined;
	setShow: (param: any) => void;
	type?: NotificationTypes;
};

const Notification = ({
	message,
	setShow,
	type = 'message',
}: NotificationProps) => {
	const getColor = (): colors => {
		switch (type) {
			case 'error':
				return 'red';
			case 'warning':
				return 'amber';
			case 'success':
				return 'green';
			default:
				return 'indigo';
		}
	};
	const selectedColor = getColor();

	return (
		<Alert
			show={!!message}
			dismissible={{
				onClose: () => setShow(null),
			}}
			color={selectedColor}
			variant="gradient"
			className="fixed lg:w-auto w-full max-w-[90vw] lg:max-w-[60vw] lg:min-w-[400px] top-[5vh] right-4 z-50"
			animate={
				window.innerWidth > 768
					? { mount: { x: -5 }, unmount: { x: 800 } }
					: {
							mount: { y: -15 },
							unmount: { y: -50 },
					  }
			}
			drag={window.innerWidth > 768 ? 'x' : 'y'}
			onDrag={() => setShow(null)}
		>
			{message}
		</Alert>
	);
};

export default Notification;
