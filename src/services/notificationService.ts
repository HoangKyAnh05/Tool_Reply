export interface SocialNotification {
  id: string;
  platform: 'facebook' | 'instagram' | 'zalo' | 'system';
  title: string;
  message: string;
  senderName?: string;
  avatarUrl?: string;
  type: 'message' | 'post' | 'story' | 'comment' | 'reaction' | 'other';
  timestamp: number;
  isRead: boolean;
  link?: string;
}

const STORAGE_KEY = 'imagine_social_notifications';

class NotificationService {
  private notifications: SocialNotification[] = [];
  private listeners: ((notifications: SocialNotification[]) => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.notifications = JSON.parse(data);
      }
    } catch (_) {
      this.notifications = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notifications.slice(0, 100)));
    } catch (_) {}
    this.notifyListeners();
  }

  public getNotifications(): SocialNotification[] {
    return [...this.notifications];
  }

  public getUnreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length;
  }

  public addNotification(item: Omit<SocialNotification, 'id' | 'timestamp' | 'isRead'>): SocialNotification {
    // Avoid duplicate message in a short time
    const isDuplicate = this.notifications.some(
      (n) => n.platform === item.platform && n.message === item.message && Date.now() - n.timestamp < 10000
    );

    if (isDuplicate) {
      return this.notifications[0];
    }

    const newNotification: SocialNotification = {
      ...item,
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: Date.now(),
      isRead: false
    };

    this.notifications.unshift(newNotification);
    this.saveToStorage();
    return newNotification;
  }

  public markAsRead(id: string) {
    this.notifications = this.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    this.saveToStorage();
  }

  public markAllAsRead() {
    this.notifications = this.notifications.map((n) => ({ ...n, isRead: true }));
    this.saveToStorage();
  }

  public clearAll() {
    this.notifications = [];
    this.saveToStorage();
  }

  public deleteNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.saveToStorage();
  }

  public subscribe(listener: (notifications: SocialNotification[]) => void) {
    this.listeners.push(listener);
    listener(this.getNotifications());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    const list = this.getNotifications();
    this.listeners.forEach((l) => l(list));
  }
}

export const notificationService = new NotificationService();
