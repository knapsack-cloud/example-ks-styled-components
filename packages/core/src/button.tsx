import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  type: 'primary' | 'secondary';
}

const SButton = styled.button<
  ButtonProps & {
    theme: DefaultTheme;
  }
>`
  padding: 8px;
  background: ${(props) => {
    return props.theme[props.type];
  }};
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
}: ButtonProps) => {
  return <SButton type={type}>{children}</SButton>;
};
