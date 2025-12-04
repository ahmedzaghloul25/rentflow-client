'use client';

import NextLink from 'next/link';
import { Button, ButtonProps } from '@mui/material';


export function LinkButton({ href, children, ...props }: ButtonProps) {
  return (
    <Button component={NextLink} href={href} {...props}>
      {children}
    </Button>
  );
}