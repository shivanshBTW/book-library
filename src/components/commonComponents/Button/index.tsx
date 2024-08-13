import clsx from 'clsx';
import styles from '~/components/commonComponents/Button.module.scss';

const { buttonContainerRoot, buttonStyle, fullWidthStyle } = styles;

interface ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { className, fullWidth, children, disabled, ...rest } = props;
  return (
    <div className={buttonContainerRoot}>
      <button
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
}

export default Button;
