import React, { useState, useContext, useEffect } from 'react';
import { Navbar, OverlayTrigger, Popover, Badge, Button, CloseButton } from 'react-bootstrap';
import { BellFill, Dot } from 'react-bootstrap-icons';
import { UserContext } from "../Contexts";
import NotificationsAPI from '../APIs/NotificationsAPI';



const Notify = () => {
  const { user } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visibleNotifications, setVisibleNotifications] = useState(3);

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await NotificationsAPI.getMyNotifications();
      if (fetchedNotifications) {
        // Sort the notifications array
        const sortedNotifications = fetchedNotifications.sort((a, b) => {
          // Unread notifications first
          if (!a.Read && b.Read) {
            return -1;
          } else if (a.Read && !b.Read) {
            return 1;
          }
  
          // If both are read or both are unread, sort by date in descending order
          return new Date(b.Date) - new Date(a.Date);
        });
  
        setNotifications(sortedNotifications);
  
        // Update unread count based on unread notifications
        const unreadNotifications = sortedNotifications.filter((notification) => !notification.Read);
        setUnreadCount(unreadNotifications.length);
      } else {
        console.error('Failed to fetch notifications');
      }
    };
  
    fetchNotifications();
  }, []);
  
  

  const markAllNotificationsAsRead = async () => {
    const notificationIds = notifications.map((notification) => notification.Id);
  
    // Use Promise.all to wait for all promises to resolve
    await Promise.all(notificationIds.map(async (notificationId) => {
      const updatedStatus = await NotificationsAPI.setNotificationAsRead(notificationId);
      if (!updatedStatus) {
        console.error(`Error marking notification with ID ${notificationId} as read`);
      }
    }));
  
    // Update the state to mark all notifications as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, Read: 1 }))
    );
    
    // Update the unreadCount to 0
    setUnreadCount(0);
  };
  
  

  const showMoreNotifications = () => {
    // Show the next 3 notifications when "View More" is clicked
    setVisibleNotifications((prevVisibleNotifications) => prevVisibleNotifications + 3);
  };

  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const notificationPopover = (
    <Popover id="notification-popover" style={{ minWidth: '200px', maxWidth: '400px' }}>
      <Popover.Header as="h3">
        Notifications {unreadCount > 0 && <Badge pill bg="danger"> {unreadCount} </Badge>}
        <CloseButton
          style={{ float: 'right' }}
          onClick={() => {
            setShowNotification(false);

            markAllNotificationsAsRead();

          }}
        />
      </Popover.Header>
      <Popover.Body>
        {notifications.slice(0, visibleNotifications).map((notification, index) => (
          <div key={index}>
            {notification.Read ? (
              <p>
                {user.role === 'Teacher' ? (
                  <>
                    A new application is available for {notification.Title}{'!'}{' '}
                    <small>
                      <i>{notification.Date}</i>
                    </small>
                  </>
                ) : (
                  <>
                    Your thesis proposal application for {notification.Title}{' '}
                    {notification.Message}{'!'}{' '}
                    <small>
                      <i>{notification.Date}</i>
                    </small>
                  </>
                )}
              </p>
            ) : (
              <p>
                <strong>
                  {user.role === 'Teacher' ? (
                    <>
                      A new application is available for {notification.Title}{'!'}{' '}
                      <small>
                        <i>{notification.Date}</i>
                      </small>
                    </>
                  ) : (
                    <>
                      Your thesis proposal application for {notification.Title}{' '}
                      {notification.Message}{'!'}{' '}
                      <small>
                        <i>{notification.Date}</i>
                      </small>
                    </>
                  )}
                </strong>
              </p>
            )}
            {<hr />}
          </div>
        ))}
        {notifications.length > visibleNotifications && (
          <div style={{ textAlign: 'center' }}>
            <a href="#" onClick={showMoreNotifications}>
              View More
            </a>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={notificationPopover}
        show={showNotification}
        onToggle={handleToggleNotification}
      >
        <Navbar.Text>
          <BellFill color="white" bg="info" onClick={handleToggleNotification} />
          {unreadCount > 0 && <Dot color="red" className="notification-dot"></Dot>}
        </Navbar.Text>
      </OverlayTrigger>
    </>
  );
};

export default Notify;
