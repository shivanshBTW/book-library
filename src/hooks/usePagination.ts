import { useCallback, useEffect, useState } from 'react';

interface PaginationProps<T> {
  itemList: T[];
  maxItemsPerPage?: number;
}

interface PaginationReturn<T> {
  pageItems: T[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  isPaginationRequired: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}

function usePagination<T>({
  itemList,
  maxItemsPerPage = 10,
}: PaginationProps<T>): PaginationReturn<T> {
  const [pageItems, setPageItems] = useState<Array<T>>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const isPaginationRequired = itemList.length > maxItemsPerPage;
  const totalPages = Math.ceil(itemList.length / maxItemsPerPage);

  const startElementIndex = (currentPage - 1) * maxItemsPerPage;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToNextPage = () => {
    if (!isLastPage) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) setCurrentPage(currentPage - 1);
  };

  const getPageItems = useCallback(() => {
    if (!isPaginationRequired) return itemList;

    const pageItems: T[] = itemList.slice(
      startElementIndex,
      startElementIndex + maxItemsPerPage
    );

    return pageItems;
  }, [itemList, isPaginationRequired, startElementIndex, maxItemsPerPage]);

  useEffect(() => {
    setPageItems(getPageItems());
  }, [itemList, currentPage, getPageItems]);

  return {
    pageItems,
    totalPages,
    currentPage,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    isPaginationRequired,
    isFirstPage,
    isLastPage,
  };
}

export default usePagination;
