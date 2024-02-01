import { useMutation } from '@tanstack/react-query'
import { defaultApiActionFn } from '@utils/axios'
import {
  MutationOptionsType,
  MutationResultType,
} from '../../@types/react-query.types'
import { User } from '../../validations/user.validations'

export default function useUserMutation(
  options?: MutationOptionsType<User>
): MutationResultType<User> {
  return useMutation({
    mutationFn: ({ id, data }) =>
      defaultApiActionFn<User>({
        url: '/users',
        id,
        data,
      }),
    ...options,
  })
}
