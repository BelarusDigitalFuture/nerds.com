class NotificationService {
  showSuccessNotification(text, type) {
    if (!this._notificationSystem) {
      return;
    }
    this._notificationSystem.type = type;
    this._notificationSystem.addNotification({
      position: 'tc',
      message: text,
      level: 'success',
    });
  }

  showErrorNotification(text) {
    if (!this._notificationSystem) {
      return;
    }
    this._notificationSystem.addNotification({
      position: 'tc',
      message: text,
      level: 'error',
    });
  }

  showInfoNotification(text) {
    if (!this._notificationSystem) {
      return;
    }
    this._notificationSystem.addNotification({
      position: 'tc',
      message: text,
      level: 'info',
    });
  }

  showWarningNotification(text) {
    if (!this._notificationSystem) {
      return;
    }
    this._notificationSystem.addNotification({
      position: 'tc',
      message: text,
      level: 'warning',
    });
  }

  setNotificationSystem(item) {
    this._notificationSystem = item;
  }
}

export default new NotificationService();
