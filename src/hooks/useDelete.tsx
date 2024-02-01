import { MutationResultType } from '@/@types/react-query.types'
import modal from 'antd/es/modal'

type useDeleteOptions = {
  name: string
}

export type DeleteRecordType = {
  id?: number
} & Record<string, any>

export function useDeleteRecord<T extends DeleteRecordType>(
  useMutation: () => MutationResultType<T>,
  { name } = { name: 'name' } as useDeleteOptions
) {
  const { mutateAsync: del } = useMutation()

  function handleDelete({ [name]: title, id }: T) {
    modal.confirm({
      closable: true,
      title: 'Tem certeza que deseja deletar?',
      content: `Isso excluirá permanentemente "${title}", não sendo possível reverter exclusão.`,
      okText: 'Excluir',
      cancelText: 'Cancelar',
      onOk() {
        return new Promise(async (resolve) => {
          await del({ id, del: true })
          resolve(true)
        }).catch(() => console.log('Oops errors!'))
      },
    })
  }

  return {
    handleDelete,
  }
}
