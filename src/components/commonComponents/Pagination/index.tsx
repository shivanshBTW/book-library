import React from 'react';
import Button from 'src/components/commonComponents/Button';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  isPaginationRequired: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const PaginationSelector: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  pageItems,
  totalPages,
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  isFirstPage,
  isLastPage,
}) => {
  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 4;
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          onClick={() => goToPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <Button onClick={goToPreviousPage} disabled={isFirstPage}>
        Previous
      </Button>
      {renderPageButtons()}
      <Button onClick={goToNextPage} disabled={isLastPage}>
        Next
      </Button>
    </div>
  );
};

export default PaginationSelector;
