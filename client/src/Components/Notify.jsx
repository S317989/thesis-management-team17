import React, { useState, useContext, useEffect } from 'react';
import { Navbar, OverlayTrigger, Popover, Badge, Button, CloseButton } from 'react-bootstrap';
import { BellFill, Dot } from 'react-bootstrap-icons';
import { UserContext } from "../Contexts";
import NotificationsAPI from '../APIs/NotificationsAPI';



const Notify = () => {
  const { user } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  // Define separate notification states for teacher and student
  const [teacherNotifications, setTeacherNotifications] = useState([
    { title: 'New Application', message: 'is available', date: '08/12/2023', read: true },
    // Add more teacher notifications as needed
  ]);

  const [studentNotifications, setStudentNotifications] = useState([
    { title: 'AI research', message: 'is accepted', date: '08/12/2023', read: true },
    { title: 'Machine Learning', message: 'is rejected', date: '26/03/2023', read: true },
    { title: 'Natural Language Processing', message: 'is rejected', date: '07/01/2022', read: true },
    // Add more student notifications as needed
  ]);

  useEffect(() => {
    // Fetch notifications on component mount
    const fetchNotifications = async () => {
      const notifications = await NotificationsAPI.getMyNotifications();
      if (notifications) {
        console.log(notifications);
      } else {
        //problem happened
      }
    };
    fetchNotifications();
  }, []);



  // Choose the appropriate notification state based on the user's role
  const notifications = user.role === 'Teacher' ? teacherNotifications : studentNotifications;

  const [unreadCount, setUnreadCount] = useState(notifications.filter((notification) => !notification.read).length);

  const [visibleNotifications, setVisibleNotifications] = useState(3);

  const showMoreNotifications = () => {
    // Show the next 3 notifications when "View More" is clicked
    setVisibleNotifications((prevVisibleNotifications) => prevVisibleNotifications + 3);
  };

  const handleToggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Function to simulate receiving a new notification
  const addNewNotification = () => {
    const newNotification = {
      title: `New Project ${notifications.length + 1}`,
      message: 'is rejected',
      date: '08/12/2023',
      read: false,
    };

    // Update the appropriate notification state based on the user's role
    if (user.role === 'Teacher') {
      setTeacherNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    } else {
      setStudentNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    }

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

            // Mark all notifications as read
            const updatedNotifications = notifications.map((notification) => ({
              ...notification,
              read: true,
            }));

            // Update the appropriate notification state based on the user's role
            if (user.role === 'Teacher') {
              setTeacherNotifications(updatedNotifications);
            } else {
              setStudentNotifications(updatedNotifications);
            }

            setUnreadCount(0);
          }}
        />
      </Popover.Header>
      <Popover.Body>
        {notifications.slice(0, visibleNotifications).map((notification, index) => (
          <div key={index}>
            {notification.read ? (
              <p>
                {user.role === 'Teacher' ? (
                  <>
                    A new application is available for {notification.title}{'!'}{' '}
                    <small>
                      <i>{notification.date}</i>
                    </small>
                  </>
                ) : (
                  <>
                    Your thesis proposal application for {notification.title}{' '}
                    {notification.message}{'!'}{' '}
                    <small>
                      <i>{notification.date}</i>
                    </small>
                  </>
                )}
              </p>
            ) : (
              <p>
                <strong>
                  {user.role === 'Teacher' ? (
                    <>
                      A new application is available for {notification.title}{'!'}{' '}
                      <small>
                        <i>{notification.date}</i>
                      </small>
                    </>
                  ) : (
                    <>
                      Your thesis proposal application for {notification.title}{' '}
                      {notification.message}{'!'}{' '}
                      <small>
                        <i>{notification.date}</i>
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
      <Button onClick={addNewNotification}>Add </Button>
    </>
  );
};

export default Notify;
