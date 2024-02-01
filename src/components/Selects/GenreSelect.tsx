import { Select, SelectProps } from 'antd'

type GenreSelectProps = Omit<SelectProps, 'options'>

export const GENRES = ['M', 'F'] as const

export const GENRE_SELECT_OPTIONS = [
  { label: 'Masculino', value: 'M' },
  { label: 'Feminino', value: 'F' },
]

export function GenreSelect({ ...props }: GenreSelectProps) {
  return (
    <Select
      {...props}
      options={GENRE_SELECT_OPTIONS.map(({ value, label }) => ({
        label,
        value,
      }))}
    />
  )
}
