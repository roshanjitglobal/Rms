import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.variant) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (toast.variant) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg shadow-lg max-w-sm ${getStyles()}`}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          {toast.title && (
            <h4 className="font-medium">{toast.title}</h4>
          )}
          {toast.description && (
            <p className="text-sm">{toast.description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const toast = ({ title, description, variant = 'default' }) => {
  // This is a simplified version that works without context
  // In a real app, you'd want to use the context properly
  const toastElement = document.createElement('div');
  toastElement.className = `fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-sm ${
    variant === 'success' 
      ? 'bg-green-50 border-green-200 text-green-800' 
      : variant === 'error'
      ? 'bg-red-50 border-red-200 text-red-800'
      : 'bg-blue-50 border-blue-200 text-blue-800'
  }`;
  
  toastElement.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-5 h-5 ${variant === 'success' ? 'text-green-500' : variant === 'error' ? 'text-red-500' : 'text-blue-500'}">
        ${variant === 'success' ? '✓' : variant === 'error' ? '✕' : 'ℹ'}
      </div>
      <div>
        ${title ? `<h4 class="font-medium">${title}</h4>` : ''}
        ${description ? `<p class="text-sm">${description}</p>` : ''}
      </div>
    </div>
  `;
  
  document.body.appendChild(toastElement);
  
  setTimeout(() => {
    if (toastElement.parentNode) {
      toastElement.parentNode.removeChild(toastElement);
    }
  }, 5000);
}; 