
import React from 'react';

/**
 * A reusable component to display a piece of detailed information with a title and icon.
 * This standardizes the look and feel across different plan steps and centralizes the robust icon handling logic.
 */
export const DetailSection: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    icon?: React.ReactElement; 
    className?: string; 
}> = ({ title, children, icon, className = '' }) => {
    let clonedIcon = null;
    if (icon) {
        const iconProps: { size: number, className: string } = {
            size: 18,
            className: 'mr-2.5 flex-shrink-0',
        };
        const existingClassName = (icon.props as any).className;
        if (existingClassName) {
            iconProps.className = iconProps.className + ' ' + existingClassName;
        }
        clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
    }
    
    return (
        <div className={`py-2 ${className}`}>
            {/* Standardize title style */}
            <h4 className="text-md font-semibold text-slate-800 mb-2 flex items-center">
                {clonedIcon}
                {title}
            </h4>
            {/* Standardize content style */}
            <div className="text-sm text-slate-600 leading-relaxed pl-9">{children}</div>
        </div>
    );
};

export default DetailSection;
