import clsx from 'clsx';
import passwordEye from '../../../assets/images/login/passwordEye.svg';
import passwordEyeClosed from '../../../assets/images/login/passwordEyeClosed.svg';
import styles from 'src/components/commonComponents/TextField.module.scss';
import { useState } from 'react';

const {
  inputComponentContainer,
  inputStyle,
  labelStyle,
  textFieldRoot,
  fullWidthStyle,
  viewPasswordToggleStyle,
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

  const isTypePassword = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={textFieldRoot}>
      {label ? <div className={labelStyle}>{label}</div> : null}
      <div className={inputComponentContainer}>
        <input
          type={isTypePassword ? (isPasswordVisible ? 'text' : type) : type}
          className={clsx(inputStyle, className, {
            [fullWidthStyle]: fullWidth,
          })}
          {...rest}
        />
        {isTypePassword ? (
          isPasswordVisible ? (
            <img
              src={passwordEyeClosed}
              alt="password-eye-closed"
              className={viewPasswordToggleStyle}
              onClick={() => setIsPasswordVisible(false)}
            />
          ) : (
            <img
              src={passwordEye}
              alt="password-eye"
              className={viewPasswordToggleStyle}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          )
        ) : null}
      </div>
    </div>
  );
}

export default TextField;
