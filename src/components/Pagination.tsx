'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages - 2, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 4) pages.push('...');
      pages.push(totalPages - 1);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const btnBase =
    'flex items-center justify-center min-w-[36px] h-9 px-2 text-sm rounded-lg transition-colors';
  const btnDefault =
    'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800';
  const btnActive =
    'bg-green-500 text-white font-medium shadow-sm dark:bg-green-600';
  const btnDisabled = 'opacity-40 cursor-not-allowed';

  return (
    <div className='flex flex-col items-center gap-2 mt-8 mb-4'>
      <span className='text-xs text-gray-400 dark:text-gray-500'>
        共 {totalPages} 页，当前第 {currentPage + 1} 页
      </span>
      <div className='flex items-center gap-1'>
        <button
          className={`${btnBase} ${btnDefault} ${currentPage === 0 ? btnDisabled : ''}`}
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft className='h-4 w-4' />
        </button>
        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className='w-9 text-center text-gray-400 dark:text-gray-500 text-sm'
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              className={`${btnBase} ${p === currentPage ? btnActive : btnDefault}`}
              onClick={() => onPageChange(p as number)}
            >
              {(p as number) + 1}
            </button>
          )
        )}
        <button
          className={`${btnBase} ${btnDefault} ${currentPage === totalPages - 1 ? btnDisabled : ''}`}
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
}
