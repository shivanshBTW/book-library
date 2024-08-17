import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from '~/components/commonComponents/Button.module.scss';
const { buttonContainerRoot, buttonStyle, fullWidthStyle } = styles;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const { className, fullWidth, children, disabled, ...rest } = props;
  return (
    <div className={buttonContainerRoot}>
      <button
        ref={ref}
        className={clsx(buttonStyle, className, {
          [fullWidthStyle]: fullWidth,
        })}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
});

export default Button;
