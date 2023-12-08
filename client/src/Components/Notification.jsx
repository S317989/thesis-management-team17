import React from 'react';
import { Modal } from 'react-bootstrap';

const Notification = ({ show, onHide, notifications }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <p>{notification}</p>
            {index !== notifications.length - 1 && <hr />} {/* Add a line separator if it's not the last notification */}
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default Notification;
