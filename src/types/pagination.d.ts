export interface PaginationResponse<T> {
  kind: string | undefined;
  currentItemCount: number;
  itemsPerPage: number;
  startIndex: number;
  totalItems: number;
  self: string;
  next?: string;
  previous?: string;
  pageIndex: number;
  totalPages: number;
  items: T[];
}
