import { FormType } from '@/@types/form.types'
import { useFormHelps } from '@/hooks/useFormHelps'
import i18n from '@/i18n'
import { decimalCommaFormatValue, decimalCommaParseValue } from '@/utils/input-number.utils'
import { Exame, ExameFormValidation } from '@/validations/exame.validations'
import { CopyOutlined } from '@ant-design/icons'
import { FormItem } from '@components/FormItem'
import { useForm } from '@hooks/useForm'
import { Button, Col, Form, Input, InputNumber, Row, Switch, Typography } from 'antd'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import FormActions from '../Actions/DefaultFormActions'
import FormCard from '../Cards/FormCard'
import { ComparisonOptionsSelect } from '../Selects/ComparisonOptionsSelect'
import { ExameGroupSelect } from '../Selects/ExameGroupSelect'
import { GenreSelect } from '../Selects/GenreSelect'
import { LaboratorySelect } from '../Selects/LaboratorySelect'
import { MenstrualPeriodSelect } from '../Selects/MenstrualPeriodSelect'
import { UnitMeasurementSelect } from '../Selects/UnitMeasurementSelect'

type ExameFormProps = FormType<Exame> & {
  onDuplicateButtonClick?: () => Promise<void>
}

export default function ExameForm({ data, onDuplicateButtonClick, onSubmit }: ExameFormProps) {
  const searchParams = useSearchParams()
  const { control, handleSubmit, watch } = useForm<Exame>({
    resolver: ExameFormValidation,
    defaultValues: useMemo(
      () =>
        data,
      [data]
    ),
  })
  const { repeat } = useFormHelps()
  const { genre, minAgePatient, maxAgePatient, referenceValues } = watch()
  const visibleDuplicate = Boolean(data?.id && !searchParams.get('duplicate'));


  return (
    <FormCard>
      <Form
        onFinish={handleSubmit((values) => onSubmit(values, { repeat }))}
        layout="vertical"
      >
        <FormItem control={control} name="name" label="Nome do Exame">
          <Input />
        </FormItem>

        <FormItem control={control} name="code" label="Código">
          <Input />
        </FormItem>

        <FormItem control={control} name="examGroup" label="Grupo de Exames" initialValue={data?.examGroup?.id}>
          <ExameGroupSelect />
        </FormItem>

        <FormItem control={control} name="laboratory" label="Laboratório" initialValue={data?.laboratory?.id}>
          <LaboratorySelect />
        </FormItem>

        <FormItem
          control={control}
          name="fasting"
          label="Em Jejum"
          valuePropName="checked"
        >
          <Switch />
        </FormItem>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <FormItem
              control={control}
              name="minAgePatient"
              label="Faixa Etária - De"

            >
              <InputNumber className="!w-full" max={maxAgePatient} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              control={control}
              name="maxAgePatient"
              label="Faixa Etária - Até"

            >
              <InputNumber className="!w-full" min={minAgePatient} />
            </FormItem>
          </Col>
        </Row>

        <FormItem control={control} name="genre" label="Gênero">
          <GenreSelect allowClear />
        </FormItem>

        <FormItem
          control={control}
          name="menstrualPeriod"
          label="Período Menstrual"
        >
          <MenstrualPeriodSelect disabled={genre === 'M'} allowClear />
        </FormItem>

        <Typography.Title level={5}>Valores de Referência</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.comparisonOperator"
              label="Op. de Comparação"
            >
              <ComparisonOptionsSelect />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.lowerValue"
              label="Valor Mínimo"
            >
              <InputNumber max={referenceValues?.highestValue} className="!w-full" formatter={decimalCommaFormatValue} parser={decimalCommaParseValue} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.highestValue"
              label="Valor Máximo"
            >
              <InputNumber min={referenceValues?.lowerValue} className="!w-full" formatter={decimalCommaFormatValue} parser={decimalCommaParseValue} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.unitMeasurement"
              initialValue={data?.referenceValues?.unitMeasurement?.id}
              label="Un. Medida"
            >
              <UnitMeasurementSelect allowClear />
            </FormItem>
          </Col>
        </Row>

        <Typography.Title level={5}>Valores de Referência Ideais</Typography.Title>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.comparisonOperatorIdeal"
              label="Op. de Comparação"
            >
              <ComparisonOptionsSelect />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.lowerValueIdeal"
              label="Valor Mínimo"
            >
              <InputNumber max={referenceValues?.highestValueIdeal} className="!w-full" formatter={decimalCommaFormatValue} parser={decimalCommaParseValue} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.highestValueIdeal"
              label="Valor Máximo"
            >
              <InputNumber min={referenceValues?.lowerValueIdeal} className="!w-full" formatter={decimalCommaFormatValue} parser={decimalCommaParseValue} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              control={control}
              name="referenceValues.unitMeasurementIdeal"
              initialValue={data?.referenceValues?.unitMeasurementIdeal?.id}
              label="Un. Medida"
            >
              <UnitMeasurementSelect />
            </FormItem>
          </Col>
        </Row>

        <FormItem control={control} name="observation" label="Observações">
          <Input.TextArea className="!w-full" />
        </FormItem>

        <FormActions>
          {visibleDuplicate && (
            <Button
              type="default"
              onClick={onDuplicateButtonClick}
            >
              <CopyOutlined />
              {i18n.t('duplicate')}
            </Button>
          )}
        </FormActions>
      </Form>
    </FormCard>
  )
}
