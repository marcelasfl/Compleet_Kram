import { ApiPaginationResult } from '@/@types/api.types'

export function setPaginationQueryData<
  TResult extends Record<string, any>,
  TData extends ApiPaginationResult<TResult>,
  TVariables extends Record<string, any>
>(result: TResult, data: TData | undefined, variables: TVariables) {
  const { content = [], ...prev } = data || {} as TData
  if ('del' in variables) {
    return {
      ...prev,
      content: content.filter((exame) => exame.id !== variables.id),
    }
  }
  return {
    ...prev,
    content: variables.id
      ? content.map((exame) => (exame.id === result.id ? result : exame))
      : [...content, result],
  }
}
