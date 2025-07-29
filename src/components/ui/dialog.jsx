import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const Dialog = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const DialogTrigger = ({ children, asChild = false, ...props }) => {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <button {...props}>{children}</button>;
};

const DialogContent = ({ children, className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={contentRef}
            className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${className}`}
            {...props}
          >
            {children}
          </div>
        </div>
      )}
      {React.Children.map(children, (child) => {
        if (child.type === DialogTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(true),
          });
        }
        return child;
      })}
    </>
  );
};

const DialogHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex items-center justify-between p-6 border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

const DialogTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h2>
  );
};

const DialogFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex justify-end gap-2 p-6 border-t ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter }; 