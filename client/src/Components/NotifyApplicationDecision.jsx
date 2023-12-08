import React, { useState } from 'react';
import { Navbar, OverlayTrigger, Popover, Badge, Button, CloseButton } from 'react-bootstrap';
import { BellFill, Dot } from 'react-bootstrap-icons';

const NotifyApplicationDecision = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([
    { title: 'AI research' , message: 'is accepted' , date: '08/12/2023' , read: true },
    { title: 'Machine Learning' , message: 'is rejected', date: '26/03/2023', read: true },
    { title: 'Natural Language Processing' , message: 'is rejected', date: '07/01/2022', read: true },
    // Add more dummy notifications as needed
  ]);

  const [unreadCount, setUnreadCount] = useState(notifications.filter(notification => !notification.read).length);

  const [visibleNotifications, setVisibleNotifications] = useState(3);

  const showMoreNotifications = () => {
    // Show the next 5 notifications when "View More" is clicked
    setVisibleNotifications((prevVisibleNotifications) => prevVisibleNotifications + 3);
  };

  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Function to simulate receiving a new notification
  const addNewNotification = () => {
    setNotifications((prevNotifications) => [
      { title: `New Project ${prevNotifications.length + 1}`, message: 'is rejected', date: '08/12/2023', read: false },
      ...prevNotifications,
    ]);
    setUnreadCount((prevCount) => prevCount + 1);
  };

  const notificationPopover = (
    <Popover id="notification-popover" style={{ minWidth: '200px', maxWidth: '400px' }}>
      <Popover.Header as="h3">
        Notifications {unreadCount > 0 && <Badge pill bg="danger">{unreadCount}</Badge>}
        <CloseButton
          style={{ float: 'right' }}
          onClick={() => {
            setShowNotification(false);
            setNotifications((prevNotifications) =>
              prevNotifications.map((notification) => ({
                ...notification,
                read: true,
              }))
            );
            setUnreadCount(0);
          }}
        />
      </Popover.Header>
      <Popover.Body>
        {notifications.slice(0, visibleNotifications).map((notification, index) => (
          <div key={index}>
         
            {notification.read ? (
                
              <p>
                Your thesis proposal application for {notification.title}{' '}
                {notification.message}{'!'}{'  '}
                <small>
                  <i>{notification.date}</i>
                </small>
              </p>
            ) : (
              <p>
                <strong>
                  Your thesis proposal application for {notification.title}{' '}
                  {notification.message}{'!'}{'  '}
                  <small>
                    <i>{notification.date}</i>
                  </small>
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
          <BellFill
            color="white"
            bg="info"
            onClick={handleToggleNotification}
          />
          {unreadCount > 0 && <Dot color="red" className='notification-dot'></Dot>}
        </Navbar.Text>
      </OverlayTrigger>
      <Button onClick={addNewNotification}>Add </Button> 
    </>


  );
};

export default NotifyApplicationDecision;
