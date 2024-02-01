import { Select, SelectProps } from 'antd'

type ComparisonOptionsSelectProps = Omit<SelectProps, 'options'>

const OPTIONS = [
  { id: 1, name: 'De - Até', value: 'FROM_TO' },
  { id: 2, name: 'Maior Que', value: 'BIGGER_THEN' },
  { id: 3, name: 'Menor Que', value: 'LESS_THAN' },
  { id: 4, name: 'Igual', value: 'UNTIL' },
]

export function ComparisonOptionsSelect({
  ...props
}: ComparisonOptionsSelectProps) {
  return (
    <Select
      {...props}
      options={OPTIONS.map(({ value, name: label }) => ({ label, value }))}
    />
  )
}
