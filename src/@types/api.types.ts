import { AxiosError } from 'axios'


export type ApiPaginationMetaResult = {
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    unpaged: boolean,
    paged: boolean
  },
  last: boolean,
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  empty: boolean
}

export type ApiPaginationResult<D = unknown> = {
  content: Array<D>
} & ApiPaginationMetaResult

export type ApiResult<D = unknown> = {
  content: D
}


export type ApiErrorWithAxios = AxiosError<{
  success: boolean
  errors: Array<string>
}>