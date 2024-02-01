import { Select, SelectProps } from 'antd'

type MenstrualPeriodSelectProps = Omit<SelectProps, 'options'>

const OPTIONS = [
  { id: 1, value: 'FOLICULAR', name: 'Folicular' },
  { id: 2, value: 'LUTEO', name: 'Lúteo' },
  { id: 3, value: 'OVÓCITO', name: 'Ovócito' },
  { id: 4, value: 'PRE/MENOPAUSA', name: 'Pré-Menopausa' },
  { id: 5, value: 'MENOPAUSA', name: 'Menopausa' },
  { id: 6, value: 'GRAVIDA1', name: 'Grávida 1' },
  { id: 7, value: 'GRAVIDA2', name: 'Grávida 2' },
  { id: 8, value: 'GRAVIDA3', name: 'Grávida 3' },
]

export function MenstrualPeriodSelect({
  ...props
}: MenstrualPeriodSelectProps) {
  return (
    <Select
      {...props}
      options={OPTIONS.map(({ value, name: label }) => ({ label, value }))}
    />
  )
}
