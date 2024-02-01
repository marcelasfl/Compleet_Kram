import { setPaginationQueryData } from '@/utils/react-query.utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { defaultApiActionFn } from '@utils/axios'
import {
  MutationOptionsType,
  MutationResultType,
  MutationTypeVariables,
} from '../../@types/react-query.types'
import { Exame } from '../../validations/exame.validations'
import {
  API_EXAME_URL,
  EXAMES_QUERY_KEY,
  useExamesResult,
} from '../Querys/useExameQuery'

export default function useExameMutation(
  options?: MutationOptionsType<Exame>
): MutationResultType<Exame> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data, del }) =>
      defaultApiActionFn<Exame>({
        url: API_EXAME_URL,
        id,
        del,
        data,
      }),
    onSuccess(data, variables) {
      const hasData = queryClient.getQueryData([EXAMES_QUERY_KEY])
      if (!hasData) return queryClient.invalidateQueries({ queryKey: [EXAMES_QUERY_KEY] })
      queryClient.setQueryData(
        [EXAMES_QUERY_KEY, undefined],
        (prev: useExamesResult) => {
          return setPaginationQueryData<
            Exame,
            useExamesResult,
            MutationTypeVariables<Exame>
          >(data, prev, variables)
        }
      )
    },
    ...options,
  })
}
