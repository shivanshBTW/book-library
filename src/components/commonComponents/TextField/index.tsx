import clsx from 'clsx';
import styles from '~/components/commonComponents/TextField.module.scss';
import { useState } from 'react';

const {
  inputComponentContainer,
  inputStyle,
  labelStyle,
  textFieldRoot,
  fullWidthStyle,
} = styles;

interface TextFieldProps {
  className?: string;
  fullWidth?: boolean;
  label?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField(props: TextFieldProps) {
  const { className, fullWidth, label, type, ...rest } = props;

  return (
    <div className={textFieldRoot}>
      {label ? <div className={labelStyle}>{label}</div> : null}
      <div className={inputComponentContainer}>
        <input
          type={type}
          className={clsx(inputStyle, className, {
            [fullWidthStyle]: fullWidth,
          })}
          {...rest}
        />
      </div>
    </div>
  );
}

export default TextField;
