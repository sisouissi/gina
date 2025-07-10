
import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: React.ReactElement;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  actions?: ReactNode; // For buttons or links at the bottom of the card
  footer?: ReactNode; // For less prominent info below actions or main content
  titleRightElement?: ReactNode; // Element to align to the right of the title
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '', titleClassName = '', actions, footer, titleRightElement }) => {
  const clonedIcon = icon ? React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, { size: 24, className: `mr-2.5 text-slate-700 ${(icon.props as any)?.className || ''}` }) : null;
  
  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {title && (
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200">
          <div className="flex items-center">
            {clonedIcon}
            <h2 className={`text-lg font-semibold text-slate-800 ${titleClassName}`}>{title}</h2>
          </div>
          {titleRightElement && <div>{titleRightElement}</div>}
        </div>
      )}
      <div className="p-4 sm:p-6 text-slate-700 space-y-4">
        {children}
      </div>
      {actions && (
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          {actions}
        </div>
      )}
       {footer && !actions && ( // If footer exists but no actions, add border top to content
        <div className="p-4 sm:p-5 border-t border-slate-200 text-xs text-slate-500">
          {footer}
        </div>
      )}
      {footer && actions && ( // If footer exists with actions, it's outside the actions div
         <div className="p-3 sm:p-4 border-t border-slate-200 text-xs text-slate-500">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
