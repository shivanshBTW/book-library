import { useState } from 'react';

interface PaginationProps<T> {
  itemList: T[];
  itemsPerPage?: number;
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
}

function usePagination<T>({
  itemList,
  itemsPerPage = 10,
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
  };
}

export default usePagination;
