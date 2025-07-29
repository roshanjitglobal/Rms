import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ children, onValueChange, ...props }) => {
  return <div {...props}>{children}</div>;
};

const SelectTrigger = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </button>
  );
};

const SelectValue = ({ placeholder, children, ...props }) => {
  return (
    <span {...props}>
      {children || placeholder}
    </span>
  );
};

const SelectContent = ({ children, className = '', ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (props.onValueChange) {
      props.onValueChange(value);
    }
  };

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {React.Children.map(children, (child) => {
          if (child.type === SelectTrigger) {
            return React.cloneElement(child, {
              onClick: () => setIsOpen(!isOpen),
            });
          }
          return child;
        })}
      </div>
      {isOpen && (
        <div
          ref={contentRef}
          className={`absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ${className}`}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (child.type === SelectItem) {
              return React.cloneElement(child, {
                onClick: () => handleSelect(child.props.value),
                className: `${child.props.className || ''} ${
                  selectedValue === child.props.value
                    ? 'bg-blue-100 text-blue-900'
                    : 'hover:bg-gray-100'
                }`,
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ children, value, className = '', ...props }) => {
  return (
    <div
      className={`px-3 py-2 text-sm cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }; 