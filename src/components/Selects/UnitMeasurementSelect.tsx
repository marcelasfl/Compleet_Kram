import { useUnitMeasuresQuery, useUnitMeasuresResult } from '@/hooks/Querys/useUnitMeasureQuery'
import { Select, SelectProps } from 'antd'

type UnitMeasurementSelectProps = Omit<SelectProps, 'options'>

const OPTIONS = [
  { id: 1, name: 'µg/dL', value: 'µg_dL' },
  { id: 2, name: 'µg/L', value: 'µg_L' },
  { id: 3, name: 'µm3', value: 'µm3' },
  { id: 4, name: 'µmol/L', value: 'µmol_L' },
  { id: 5, name: 'µU/mL', value: 'µU_mL' },
  { id: 6, name: 'µUI/mL', value: 'µUI_mL' },
  { id: 7, name: 'fL', value: 'fL' },
  { id: 8, name: 'g/dL', value: 'g_dL' },
  { id: 9, name: 'mcg/dL', value: 'mcg_dL' },
  { id: 10, name: 'mcU/mL', value: 'mcU_mL' },
  { id: 11, name: 'mg/dL', value: 'mg_dL' },
  { id: 12, name: 'mg/L', value: 'mg_L' },
  { id: 13, name: 'micromol/L', value: 'micromol_L' },
  { id: 14, name: 'milhoes/mm3', value: 'milhoes_mm3' },
  { id: 15, name: 'mm3', value: 'mm3' },
  { id: 16, name: 'mmol/L', value: 'mmol_L' },
  { id: 17, name: 'mUI/mL', value: 'mUI_mL' },
  { id: 18, name: 'ng/dL', value: 'ng_dL' },
  { id: 19, name: 'ng/mL', value: 'ng_mL' },
  { id: 20, name: 'nmol/L', value: 'nmol_L' },
  { id: 21, name: 'pg', value: 'pg' },
  { id: 22, name: 'pg/mL', value: 'pg_mL' },
  { id: 23, name: 'U/L', value: 'U_L' },
  { id: 24, name: 'U/mL', value: 'U_mL' },
  { id: 25, name: 'ug/dL', value: 'ug_dL' },
  { id: 26, name: 'ug/L', value: 'ug_L' },
  { id: 27, name: 'UI/L', value: 'UI_L' },
  { id: 28, name: 'UI/mL', value: 'UI_mL' },
  { id: 29, name: 'umol/L', value: 'umol_L' },
  { id: 30, name: 'uUI/mL', value: 'uUI_mL' },
  { id: 31, name: '%', value: 'PERCENTAGE' },
]

export function UnitMeasurementSelect({
  ...props
}: UnitMeasurementSelectProps) {
  const { data = {} as useUnitMeasuresResult } = useUnitMeasuresQuery()
  const { content = [] } = data

  return (
    <Select
      {...props}
      options={content?.map(({ id, name }) => ({ label: name, value: id }))}
    />
  )
}
