import clsx from 'clsx';
import Button from 'src/components/commonComponents/Button';
import { PaginationReturn } from 'src/hooks/usePagination';
import styles from '~/components/commonComponents/Pagination.module.scss';
import StickyComponent from 'src/components/commonComponents/StickyComponent';

const { root, selectorButtonStyle, selectedButtonStyle } = styles;

interface PaginationProps<T> extends PaginationReturn<T> {
  hideFirstLastButtons?: boolean;
  hidePreviousNextButtons?: boolean;
}

const PaginationSelector = <T,>({
  hideFirstLastButtons = false,
  hidePreviousNextButtons = false,
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  isFirstPage,
  isLastPage,
  pageButtonList,
}: PaginationProps<T>) => {
  return (
    <StickyComponent>
      <div className={root}>
        {!hideFirstLastButtons && (
          <Button
            onClick={goToFirstPage}
            disabled={isFirstPage}
            className={selectorButtonStyle}
          >
            {'<<'}
          </Button>
        )}
        {!hidePreviousNextButtons && (
          <Button
            onClick={goToPreviousPage}
            disabled={isFirstPage}
            className={selectorButtonStyle}
          >
            {'<'}
          </Button>
        )}

        {pageButtonList.map((page) => {
          return (
            <Button
              key={page}
              onClick={() => goToPage(page)}
              className={clsx(selectorButtonStyle, {
                [selectedButtonStyle]: currentPage === page,
              })}
            >
              {page}
            </Button>
          );
        })}

        {!hidePreviousNextButtons && (
          <Button
            onClick={goToNextPage}
            disabled={isLastPage}
            className={selectorButtonStyle}
          >
            {'>'}
          </Button>
        )}
        {!hideFirstLastButtons && (
          <Button
            onClick={goToLastPage}
            disabled={isLastPage}
            className={selectorButtonStyle}
          >
            {'>>'}
          </Button>
        )}
      </div>
    </StickyComponent>
  );
};

export default PaginationSelector;
