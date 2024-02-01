import { Card } from 'antd'
import React from 'react'

type TableActionsCardProps = {
  children: React.ReactNode
}

export default function TableActionsCard({ children }: TableActionsCardProps) {
  return <Card bordered={false}>{children}</Card>
}
