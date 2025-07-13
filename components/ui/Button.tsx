
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'warning' | 'success' | 'info' | 'violet' | 'yellow' | 'lime' | 'teal' | 'orange';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  justify?: 'start' | 'center' | 'end' | 'between';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  justify = 'center',
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus:shadow-lg transform hover:-translate-y-px active:translate-y-0";
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white focus:ring-sky-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gradient-to-br from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-800 focus:ring-slate-400 border border-slate-300';
      break;
    case 'danger':
      variantStyles = 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500';
      break;
    case 'warning':
      variantStyles = 'bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white focus:ring-amber-400';
      break;
    case 'success':
      variantStyles = 'bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white focus:ring-emerald-400';
      break;
    case 'info':
      variantStyles = 'bg-gradient-to-br from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white focus:ring-cyan-400';
      break;
    case 'violet':
      variantStyles = 'bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white focus:ring-violet-500';
      break;
    case 'yellow':
      variantStyles = 'bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black focus:ring-yellow-300';
      break;
    case 'lime':
      variantStyles = 'bg-gradient-to-br from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white focus:ring-lime-400';
      break;
    case 'teal':
      variantStyles = 'bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white focus:ring-teal-400';
      break;
    case 'orange':
      variantStyles = 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white focus:ring-orange-400';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent hover:bg-slate-100 text-sky-600 focus:ring-sky-500 shadow-none hover:shadow-none';
      break;
  }

  let sizeStyles = '';
  let iconSize = 20;
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-xs';
      iconSize = 16;
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-sm';
      iconSize = 18;
      break;
    case 'lg':
      sizeStyles = 'px-5 py-2.5 text-base';
      iconSize = 20;
      break;
    case 'xl':
      sizeStyles = 'px-6 py-3 text-lg';
      iconSize = 22;
      break;
  }

  const widthStyles = fullWidth ? 'w-full' : '';
  const justifyClass = `justify-${justify}`;

  let clonedLeftIcon = null;
  if (leftIcon) {
      const iconProps: { size: number; className: string; } = {
          size: iconSize,
          className: 'mr-2',
      };
      if ((leftIcon.props as any).className) {
        iconProps.className += ' ' + (leftIcon.props as any).className;
      }
      clonedLeftIcon = React.cloneElement(leftIcon as React.ReactElement<any>, iconProps);
  }

  let clonedRightIcon = null;
  if (rightIcon) {
      const iconProps: { size: number; className: string; } = {
          size: iconSize,
          className: 'ml-2',
      };
      if ((rightIcon.props as any).className) {
        iconProps.className += ' ' + (rightIcon.props as any).className;
      }
      clonedRightIcon = React.cloneElement(rightIcon as React.ReactElement<any>, iconProps);
  }

  const finalClassName = [baseStyles, variantStyles, sizeStyles, widthStyles, justifyClass, className].filter(Boolean).join(' ');

  return (
    <button
      className={finalClassName}
      {...props}
    >
      {clonedLeftIcon}
      {children}
      {clonedRightIcon}
    </button>
  );
};

export default Button;
