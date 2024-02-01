import { FormTypeSubmitOptions } from '@/@types/form.types'
import { MutationResultType } from '@/@types/react-query.types'
import i18n from '@/i18n'
import { getRawEntityNameWithPatchName } from '@/utils/crud.utils'
import { message as Message } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { useParams, useRouter } from 'next/navigation'

type CrudPageHelpsProps<T> = {
  useMutation: () => MutationResultType<T>
}

export default function useCrudPageHelps<T extends AnyObject>({
  useMutation,
}: CrudPageHelpsProps<T>) {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { mutateAsync: action } = useMutation()
  const entity = getRawEntityNameWithPatchName() as never

  function showMessage() {
    const message = id ? 'crud.success.edit' : ('crud.success.add' as const)
    Message.success(i18n.t(message, { entity: i18n.t(entity) }))
  }

  async function onSubmit(data: T, options?: FormTypeSubmitOptions) {
    const { repeat } = options || {}
    const nextData = await action({ data, id })
    showMessage()
    const entity = getRawEntityNameWithPatchName() as never
    if (!repeat) router.push(`/dashboard/${entity}`)
    return nextData
  }

  return { id, onSubmit }
}
