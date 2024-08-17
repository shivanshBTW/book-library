import { forwardRef, useState } from 'react';
import { LuImageOff } from 'react-icons/lu';
import style from 'src/styles/components/commonComponents/Image.module.scss';
const { errorImage } = style;

const Image = forwardRef(function Image(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
  ref: React.Ref<HTMLImageElement>
) {
  const { children, ...rest } = props;

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => setImageError(true);

  return imageError ? (
    <LuImageOff className={errorImage} />
  ) : (
    <img ref={ref} onError={handleImageError} {...rest}>
      {children}
    </img>
  );
});

export default Image;
