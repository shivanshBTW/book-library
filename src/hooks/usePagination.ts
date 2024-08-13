import { useState } from 'react';

interface PaginationProps<T> {
  itemList: T[];
  maxItemsPerPage?: number;
}

function usePagination<T>({
  itemList,
  maxItemsPerPage = 10,
}: PaginationProps<T>) {
  const [items, setItems] = useState(itemList);
  const [currentPage, setCurrentPage] = useState(1);

  const isPaginationRequired = items.length > maxItemsPerPage;
  const totalPages = Math.ceil(items.length / maxItemsPerPage);

  const startElementIndex = (currentPage - 1) * maxItemsPerPage;
  const pageItems: T[] = !isPaginationRequired
    ? items
    : items.slice(startElementIndex, startElementIndex + maxItemsPerPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToNextPage = () => {
    if (!isLastPage) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) setCurrentPage(currentPage - 1);
  };

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
