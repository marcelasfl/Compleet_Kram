'use client'
import { getCrudFullActionWithPatchName } from '@/utils/crud.utils'
import { Card, CardProps } from 'antd'
import clsx from 'clsx'

type FormCardProps = CardProps

export default function FormCard({
  title: titleProp,
  children,
  className,
  ...props
}: FormCardProps) {
  const title = titleProp || getCrudFullActionWithPatchName()


  return (
    <Card
      title={title}
      className={clsx('!rounded-md !shadow-sm', className)}
      {...props}
    >
      {children}
    </Card>
  )
}
