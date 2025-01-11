import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../redux/actionCreators/notificationActions.ts';
import './styling/Notification.css';

export const Notification = () => {
	const notifications = useSelector((state) => state.notification);
	const dispatch = useDispatch();

	useEffect(() => {
		const timeoutIds = Object.keys(notifications).map((type) => {
			return setTimeout(() => {
				dispatch(removeNotification(type));
			}, 2500);
		});

		return () => {
			timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
		};
	}, [notifications, dispatch]);

	return (
		<>
			{Object.keys(notifications).length === 0 ? null : (
				<div className="notification-container">
					{Object.keys(notifications).map((type) => {
						const { message, status } = notifications[type];
						return (
							<div key={type} className={`notification-${status}`}>
								{message}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};
