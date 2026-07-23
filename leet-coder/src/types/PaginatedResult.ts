import { PaginationMeta } from "./PaginationMeta";

export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}