export interface NotificationDTO {
  id: string;
  title: null | string;
  message: string;
  recipient: string;
  read: boolean;
  createdAt: string;
}
