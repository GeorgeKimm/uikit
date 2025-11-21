import React from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// Currently no custom props, but you can extend this type in the future
export type ButtonProps = MuiButtonProps;


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        // Use twMerge to merge default classes with user provided classes
        // clsx handles conditional classes if needed
        className={twMerge(clsx(className))}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';
