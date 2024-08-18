import { useEffect, useRef, useState } from 'react';
import styles from '~/components/commonComponents/StickyComponent.module.scss';
const { stickyRoot } = styles;

type StickyComponentProps = {
  children: React.ReactNode;
};

const StickyComponent = ({ children }: StickyComponentProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: [1.0],
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div>
      {isSticky ? <div className={stickyRoot}>{children}</div> : null}
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default StickyComponent;
