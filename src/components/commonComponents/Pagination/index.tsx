import clsx from 'clsx';
import React from 'react';
import Button from 'src/components/commonComponents/Button';
import styles from '~/components/commonComponents/Pagination.module.scss';
const { root, selectorButtonStyle, selectedButtonStyle } = styles;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  isPaginationRequired: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const PaginationSelector: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  goToFirstPage,
  goToLastPage,
  isFirstPage,
  isLastPage,
}) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

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
      <Button
        onClick={goToFirstPage}
        disabled={isFirstPage}
        className={selectorButtonStyle}
      >
        {'<<'}
      </Button>
      <Button
        onClick={goToPreviousPage}
        disabled={isFirstPage}
        className={selectorButtonStyle}
      >
        {'<'}
      </Button>
      {renderPageButtons()}
      <Button
        onClick={goToNextPage}
        disabled={isLastPage}
        className={selectorButtonStyle}
      >
        {'>'}
      </Button>
      <Button
        onClick={goToLastPage}
        disabled={isLastPage}
        className={selectorButtonStyle}
      >
        {'>>'}
      </Button>
    </div>
  );
};

export default PaginationSelector;
