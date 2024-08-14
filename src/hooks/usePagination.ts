import { useCallback, useEffect, useState } from 'react';

interface PaginationProps<T> {
  itemList: T[];
  itemsPerPage?: number;
}

interface PaginationReturn<T> {
  pageItems: T[];
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  isPaginationRequired: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function usePagination<T>({
  itemList,
  itemsPerPage = 10,
}: PaginationProps<T>): PaginationReturn<T> {
  const [pageItems, setPageItems] = useState<Array<T>>([]);
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

  const getPageItems = useCallback(() => {
    if (!isPaginationRequired) return itemList;

    const pageItems: T[] = itemList.slice(
      startElementIndex,
      startElementIndex + itemsPerPage
    );

    return pageItems;
  }, [itemList, isPaginationRequired, startElementIndex, itemsPerPage]);

  useEffect(() => {
    setPageItems(getPageItems());
  }, [itemList, currentPage, getPageItems]);

  return {
    pageItems,
    totalPages,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    isPaginationRequired,
    isFirstPage,
    isLastPage,
  };
}

export default usePagination;
