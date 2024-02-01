import { Tag, TagProps } from 'antd'
import clsx from 'clsx'

type ActiveTagProps = TagProps & {
  value: Boolean
}

export function ActiveTag({ value, className, ...props }: ActiveTagProps) {
  return (
    <Tag
      className={clsx(className, '!text-white', {
        'bg-red-500': !value,
        'bg-blue-500': value,
      })}
      {...props}
    >
      {value ? 'Sim' : 'Não'}
    </Tag>
  )
}
