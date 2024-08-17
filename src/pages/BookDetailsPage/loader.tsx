import clsx from 'clsx';
import Button from 'src/components/commonComponents/Button';
import TopBar from 'src/components/TopBar';

import styles from '~/pages/BookDetailsPage.module.scss';
import commonStyles from '~/commonStyles.module.scss';
import { useNavigate } from 'react-router-dom';
const {
  root,
  bookDataContainerStyle,
  coverImageContainerStyle,
  coverImageStyle,
  detailsContainer,
  bookTitleText,
  authorNameText,
  descriptionText,
  dateText,
  loaderStyle,
} = styles;
const { loaderAnimation } = commonStyles;

function BookDetailsPageLoader() {
  const navigate = useNavigate();
  const handleGoToHomePage = () => {
    navigate('/');
  };
  return (
    <div className={root}>
      <TopBar />

      <div className={bookDataContainerStyle}>
        <div className={clsx(loaderAnimation, coverImageContainerStyle)}>
          <div className={coverImageStyle} />
        </div>

        <div className={detailsContainer}>
          <div className={clsx(loaderAnimation, bookTitleText, loaderStyle)}>
            &nbsp;
          </div>
          <div className={clsx(loaderAnimation, authorNameText, loaderStyle)}>
            &nbsp;
          </div>
          <div className={clsx(loaderAnimation, descriptionText, loaderStyle)}>
            &nbsp;
          </div>
          <div className={clsx(loaderAnimation, dateText, loaderStyle)}>
            &nbsp;
          </div>
          <Button onClick={handleGoToHomePage}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPageLoader;
