import React from 'react';
import './styles';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export default function Button({ children, ...rest }: Props) {
  return (
    <button {...rest}>{children}</button>
  );
}
