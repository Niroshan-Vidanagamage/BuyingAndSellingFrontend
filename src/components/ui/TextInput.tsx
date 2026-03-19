import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRounded from '@mui/icons-material/SearchRounded';

type TextInputSize = 'default' | 'small' | 'search';

export type TextInputProps = TextFieldProps & {
  inputSize?: TextInputSize;
};

const config: Record<TextInputSize, { radius: number; padding: string; fontSize: string; hasIcon: boolean }> = {
  default: { radius: 5, padding: '10px 12px', fontSize: '16px', hasIcon: false },
  small: { radius: 10, padding: '10px 12px', fontSize: '12px', hasIcon: false },
  search: { radius: 10, padding: '15px 14px', fontSize: '16px', hasIcon: true },
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { inputSize = 'default', sx, InputProps, ...props },
  ref,
) {
  const styles = config[inputSize];
  const searchAdornment = styles.hasIcon ? (
    <InputAdornment position="start">
      <SearchRounded sx={{ color: 'primary.main' }} />
    </InputAdornment>
  ) : undefined;

  return (
    <TextField
      inputRef={ref}
      InputProps={{
        ...InputProps,
        startAdornment: InputProps?.startAdornment ?? searchAdornment,
      }}
      sx={[
        {
          '& .MuiOutlinedInput-root': {
            borderRadius: `${styles.radius}px`,
          },
          '& .MuiOutlinedInput-input': {
            padding: styles.padding,
            fontSize: styles.fontSize,
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...props}
    />
  );
});

export default TextInput;