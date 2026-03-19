import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import { SxProps, Theme } from '@mui/material/styles';

type AppButtonVariant = 'master' | 'slave' | 'white' | 'drop';

export type AppButtonProps = ButtonProps & {
  variantStyle?: AppButtonVariant;
};

const buttonStyles: Record<AppButtonVariant, SxProps<Theme>> = {
  master: {
    borderRadius: '15px',
    minHeight: 48,
    px: 2.25,
    fontSize: '18px',
    fontWeight: 700,
    backgroundColor: 'common.black',
    color: 'common.white',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: 'primary.main',
    },
  },
  slave: {
    borderRadius: '15px',
    minHeight: 48,
    px: 2.25,
    fontSize: '16px',
    fontWeight: 400,
    backgroundColor: 'neutral.main',
    color: 'common.black',
    border: '2px solid transparent',
    '&:hover': {
      backgroundColor: '#b6b6b6',
    },
  },
  white: {
    borderRadius: '15px',
    minHeight: 48,
    px: 2.25,
    fontSize: '16px',
    fontWeight: 400,
    backgroundColor: 'common.white',
    color: 'common.black',
    border: '2px solid',
    borderColor: 'common.black',
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
  },
  drop: {
    borderRadius: '5px',
    minHeight: 48,
    px: 2.25,
    fontSize: '16px',
    fontWeight: 400,
    backgroundColor: 'common.white',
    color: 'common.black',
    border: '2px solid',
    borderColor: 'neutral.main',
    '&:hover': {
      backgroundColor: '#f8f9ff',
    },
  },
};

export default function AppButton({
  children,
  variantStyle = 'master',
  sx,
  endIcon,
  ...props
}: AppButtonProps) {
  const resolvedEndIcon = variantStyle === 'drop' ? <ExpandMoreRounded /> : endIcon;

  return (
    <Button
      disableElevation
      endIcon={resolvedEndIcon}
      sx={[
        buttonStyles[variantStyle],
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    >
      {children}
    </Button>
  );
}