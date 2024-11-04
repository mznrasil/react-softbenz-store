import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { cn } from '@/lib/utils.ts';

interface Props {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const ProductsPagination = ({
  totalPages,
  currentPage,
  hasPrevPage,
  hasNextPage,
}: Props) => {
  let pagesList: number[];
  if (totalPages === 1) {
    pagesList = [1];
  } else if (totalPages === 2) {
    pagesList = [1, 2];
  } else {
    pagesList = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  return (
    <Pagination className={'mt-8'}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/products?page=${currentPage - 1}`}
            className={cn('', {
              'pointer-events-none opacity-50': !hasPrevPage,
            })}
          />
        </PaginationItem>
        <PaginationItem>
          {pagesList.map((page, index) => (
            <PaginationLink
              key={index}
              href={`?page=${page}`}
              className={cn('', {
                'bg-primary hover:bg-primary/60 text-white':
                  currentPage === page,
              })}
            >
              {page}
            </PaginationLink>
          ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            className={cn('', {
              'pointer-events-none opacity-50': !hasNextPage,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
