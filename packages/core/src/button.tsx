import React, { PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';

// Button Component
interface ButtonProps {
  type: 'primary' | 'secondary';
}

const SButton = styled.button<
  ButtonProps & {
    theme: DefaultTheme;
  }
>`
  padding: 8px;
  background: ${(props) => {
    return props.theme.color.semantic.button.bg['01'];
  }};
`;

export const Button = ({
  children,
  type = 'primary',
}: PropsWithChildren<ButtonProps>) => {
  return <SButton type={type}>{children}</SButton>;
};
