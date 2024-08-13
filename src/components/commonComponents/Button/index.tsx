import clsx from 'clsx';
import styles from '~/components/commonComponents/Button.module.scss';
const { buttonContainerRoot, buttonStyle, fullWidthStyle } = styles;

interface ButtonProps {
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode | string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<Element> | undefined) => void;
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
