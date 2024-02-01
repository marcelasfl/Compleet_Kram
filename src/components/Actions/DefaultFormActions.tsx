import i18n from '@/i18n'
import { getCrudActionWithPatchName, getRawEntityNameWithPatchName } from '@/utils/crud.utils'
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useRouter } from 'next/navigation'

type FormActionsProps = {
  children?: React.ReactNode
}

export default function FormActions({
  children,
}: FormActionsProps) {
  const { back } = useRouter()
  const action = getCrudActionWithPatchName()
  const text = action === 'add' ? 'crud.add' : 'crud.edit'
  const entity = getRawEntityNameWithPatchName() as any

  return (
    <Space align="center" className="!w-full flex  justify-end">
      <Button type="default" onClick={() => back()}>
        <RollbackOutlined />
        {i18n.t('cancel')}
      </Button>
      {children}

      <Button type="primary" htmlType="submit" className="!ml-auto">
        <SaveOutlined />
        {i18n.t(text, { entity: i18n.t(entity) })}
      </Button>
    </Space>
  )
}
