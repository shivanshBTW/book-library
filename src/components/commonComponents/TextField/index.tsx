import clsx from 'clsx';
import styles from '~/components/commonComponents/TextField.module.scss';
import { forwardRef } from 'react';

const {
  inputComponentContainer,
  inputStyle,
  labelStyle,
  textFieldRoot,
  fullWidthStyle,
  errorMessageStyle,
} = styles;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  label?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  const { className, fullWidth, label, type, errorMessage, ...rest } = props;

  return (
    <div className={textFieldRoot}>
      {label ? <div className={labelStyle}>{label}</div> : null}
      <div className={inputComponentContainer}>
        <input
          ref={ref}
          type={type}
          className={clsx(inputStyle, className, {
            [fullWidthStyle]: fullWidth,
          })}
          {...rest}
        />
      </div>
      {errorMessage ? (
        <div className={errorMessageStyle}>{errorMessage}</div>
      ) : null}
    </div>
  );
});

export default TextField;
