import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../redux/actionCreators/notificationActions.ts';
import './styling/Notification.css';
import CircularProgress from '@mui/material/CircularProgress';

export const Notification = () => {
	const notifications = useSelector((state) => state.notification);
	const dispatch = useDispatch();
	const [visibleNotifications, setVisibleNotifications] = useState({});

	useEffect(() => {
        const timeoutIds = Object.keys(notifications).map((type) => {
            if (notifications[type].status === 'loading') {
                setVisibleNotifications((prev) => ({
                    ...prev,
                    [type]: true,
                }));
                return null;
            }

            setVisibleNotifications((prev) => ({
                ...prev,
                [type]: true,
            }));

            return setTimeout(() => {
                setVisibleNotifications((prev) => ({
                    ...prev,
                    [type]: false,
                }));
                setTimeout(() => {
                    dispatch(removeNotification(type));
                }, 500);
            }, 2500);
        }).filter(Boolean);

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
						const isVisible = visibleNotifications[type];
						return (
							<div key={type} className={`notification notification-${status} ${isVisible ? 'notification-show' : ''}`}>
								{message}
								{status === 'loading' && (
									<div className="notification-circular">
										<CircularProgress size={15} />
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};
