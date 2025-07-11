
import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleVideoCompleted = (event: CustomEvent) => {
      const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        message: `Vídeo "${event.detail.filename}" processado com sucesso!`,
        type: 'success'
      };
      
      setNotifications(prev => [...prev, notification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    };

    window.addEventListener('videoCompleted', handleVideoCompleted as EventListener);
    
    return () => {
      window.removeEventListener('videoCompleted', handleVideoCompleted as EventListener);
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "glass-effect rounded-lg p-4 shadow-lg min-w-[300px] flex items-center space-x-3 animate-in slide-in-from-right duration-300",
            notification.type === 'success' && "border-green-500/20",
            notification.type === 'error' && "border-red-500/20",
            notification.type === 'info' && "border-blue-500/20"
          )}
        >
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <p className="text-sm text-foreground flex-1">{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
