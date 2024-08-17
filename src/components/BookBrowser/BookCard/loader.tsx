import clsx from 'clsx';
import styles from '~/components/BookBrowser/BookCard.module.scss';
import commonStyles from '~/commonStyles.module.scss';

const { loaderAnimation } = commonStyles;
const {
  root,
  container,
  topSectionContainer,
  coverImageContainer,
  bookTitleStyle,
  authorNameContainerStyle,
  authorNameStyle,
  buttonGroupContainer,
  actionButtonStyle,
  loaderStyle,
} = styles;

const BookCardLoader = () => {
  return (
    <div className={root}>
      <div className={container}>
        <div className={topSectionContainer}>
          <div>
            <div className={clsx(loaderAnimation, coverImageContainer)} />
            <div className={clsx(bookTitleStyle, loaderStyle)}>
              <div className={clsx(loaderAnimation)}>&nbsp;</div>
            </div>
          </div>

          <div className={clsx(authorNameContainerStyle, loaderStyle)}>
            <div className={clsx(loaderAnimation, authorNameStyle)}>&nbsp;</div>
          </div>
        </div>
        <div>
          <div className={clsx(loaderAnimation, buttonGroupContainer)}>
            <div className={actionButtonStyle}>&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCardLoader;
