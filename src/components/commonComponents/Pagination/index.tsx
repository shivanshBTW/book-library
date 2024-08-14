import clsx from 'clsx';
import React from 'react';
import Button from 'src/components/commonComponents/Button';
import { PaginationReturn } from 'src/hooks/usePagination';
import styles from '~/components/commonComponents/Pagination.module.scss';
const { root, selectorButtonStyle, selectedButtonStyle } = styles;

interface PaginationProps<T> extends PaginationReturn<T> {
  hideFirstLastButtons?: boolean;
  hidePreviousNextButtons?: boolean;
  showAllPages?: boolean;
}

const PaginationSelector = <T,>({
  hideFirstLastButtons = false,
  hidePreviousNextButtons = false,
  showAllPages = false,
  totalPages,
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  isFirstPage,
  isLastPage,
}: PaginationProps<T>) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 4;
    let startPage, endPage;
    if (showAllPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      endPage = Math.min(totalPages, startPage + maxButtons - 1);
    }

    // If on the last page(s), adjust the startPage to still show 4 buttons
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      const isSelectedPage = currentPage === page;
      buttons.push(
        <Button
          key={page}
          onClick={() => goToPage(page)}
          className={clsx(selectorButtonStyle, {
            [selectedButtonStyle]: isSelectedPage,
          })}
        >
          {page}
        </Button>
      );
    }

    return buttons;
  };

  return (
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
      {renderPageButtons()}
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
  );
};

export default PaginationSelector;
