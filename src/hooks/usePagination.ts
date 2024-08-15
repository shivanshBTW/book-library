import { useCallback, useMemo, useState } from 'react';

interface PaginationProps<T> {
  itemList: T[];
  itemsPerPage?: number;
  showAllPages?: boolean;
}

export interface PaginationReturn<T> {
  pageItems: T[];
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
  pageButtonList: number[];
}

function usePagination<T>({
  itemList,
  itemsPerPage = 10,
  showAllPages,
}: PaginationProps<T>): PaginationReturn<T> {
  const [currentPage, goToPage] = useState(1);

  const isPaginationRequired = itemList.length > itemsPerPage;
  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  const startElementIndex = (currentPage - 1) * itemsPerPage;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToNextPage = () => {
    if (!isLastPage) goToPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) goToPage(currentPage - 1);
  };

  const goToFirstPage = () => {
    goToPage(1);
  };

  const goToLastPage = () => {
    goToPage(totalPages);
  };

  let pageItems: T[];
  if (!isPaginationRequired) {
    pageItems = itemList;
  } else {
    pageItems = itemList.slice(
      startElementIndex,
      startElementIndex + itemsPerPage
    );
  }

  const pageButtonList = useMemo(() => {
    const maxButtons = 4;
    let startPage, endPage;
    if (showAllPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      endPage = Math.min(totalPages, startPage + maxButtons - 1);
    }

    // handling the last page
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    const buttons = [];
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }
    return buttons;
  }, [currentPage, showAllPages, totalPages]);

  return {
    pageItems,
    totalPages,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    isPaginationRequired,
    isFirstPage,
    isLastPage,
    pageButtonList,
  };
}

export default usePagination;
