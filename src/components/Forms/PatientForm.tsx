import { FormType } from '@/@types/form.types';
import FormActions from '@/components/Actions/DefaultFormActions';
import FormCard from '@/components/Cards/FormCard';
import { useFormHelps } from '@/hooks/useFormHelps';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ViaCepService } from '@/services/ViaCep.service';
import { disableDateGreaterToday } from '@/utils/dayjs.utils';
import { Patient, PatientFormValidation } from '@/validations/patient.validations';
import { DeleteOutlined, LoadingOutlined, MailOutlined, NumberOutlined, PlusOutlined } from '@ant-design/icons';
import { FormItem } from '@components/FormItem';
import { useForm } from '@hooks/useForm';
import { Button, Col, DatePicker, Flex, Form, Input, InputProps, Radio, Row, Typography, message } from 'antd';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import InputMask from 'react-input-mask';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


export const RADIO_GENRE_OPTIONS = [
  { label: 'Masculino', value: 'MASCULINO' },
  { label: 'Feminino', value: 'FEMININO' },
]

export default function PatientForm({ data, onSubmit }: FormType<Patient>) {
  const { control, setValue, handleSubmit, watch, formState: { errors } } = useForm<Patient>({
    resolver: PatientFormValidation,
    defaultValues: useMemo(() => ({ ...data, birthDate: dayjs(data?.birthDate) }), [data]),
  });
  const [loading, setLoading] = useState(false);
  const { repeat } = useFormHelps();
  const { pathImage, birthDate } = watch();
  const [loadingAddress, setLoadingAddress] = useState(false)
  const isMobile = useIsMobile();

  async function handlePostalCodeChange(postalCode: string) {
    if (postalCode.length < 8) return
    setLoadingAddress(true)
    const { bairro: neighborhood, localidade: city, logradouro: street, uf: state, complemento: complement } = await ViaCepService.getAddressByCep(postalCode)
    setValue('streetName', street)
    setValue('neighborhood', neighborhood)
    setValue('city', city)
    setValue('state', state)
    setValue('complement', complement)
    setLoadingAddress(false)

  }


  function handleImageDelete() {
    setValue('pathImage', '');
  }

  const handleImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log({ info });

    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setValue('pathImage', url);
      });
    }

  };

  const handleBirthDateChange = (birthDate: dayjs.Dayjs | null) => {
    if (!birthDate) return;
    const age = dayjs().diff(birthDate, 'year');
    setValue('age', age);
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  return (
    <FormCard>
      <Form
        onFinish={handleSubmit((values) => onSubmit(values, { repeat }))}
        layout="vertical"
      >

        <Row gutter={[16, 16]}>
          <Col sm={{ span: 24 }} lg={{ span: 14 }} order={isMobile ? 2 : 1}>
            <Row gutter={[8, 8]}>
              <Col span={18}>
                <FormItem control={control} name="name" label="Nome">
                  <Input />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem control={control} name="code" label="Código">
                  <Input prefix={<NumberOutlined />} disabled />
                </FormItem>
              </Col>
              <Col span={18}>
                <FormItem control={control} name="birthDate" label="Data de Nascimento">
                  <DatePicker className='w-full' disabledDate={disableDateGreaterToday} format={'DD/MM/YYYY'} onChange={handleBirthDateChange} />
                </FormItem>
              </Col>
              <Col span={6}>
                <Typography.Text className='!mb-4'>Idade</Typography.Text>
                <Input disabled className='!mt-2' value={(data?.birthDate && dayjs().diff(dayjs(data?.birthDate), 'year'))} />

              </Col>
              <Col span={24}>
                <FormItem control={control} name="biologicalGenre" label="Sexo Biológico" >
                  <Radio.Group options={RADIO_GENRE_OPTIONS} />
                </FormItem>
              </Col>

              <Col span={24}>
                <FormItem control={control} name="surname" label="Nome Civil">
                  <Input />
                </FormItem>
              </Col>

              <Col span={24}>
                <FormItem control={control} name="occupation" label="Profissão">
                  <Input />
                </FormItem>
              </Col>



              <Col span={24}>
                <FormItem control={control} name="emailAddress" label="Email">
                  <Input prefix={<MailOutlined />} type='email' datatype='email' />
                </FormItem>
              </Col>


              <Col span={12}>
                <FormItem control={control} name="documentNumber" label="CPF">
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=""

                  >
                    {/* @ts-ignore */}
                    {(inputProps: InputProps) => <Input {...inputProps} />}
                  </InputMask>

                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem control={control} name="rg" label="RG">
                  <Input />
                </FormItem>
              </Col>

            </Row>
          </Col>

          <Col sm={{ span: 24 }} lg={{ span: 10 }} order={isMobile ? 1 : 2} >
            <Flex gap={4} justify='end'>
              <Upload
                name="pathImage"
                listType="picture-circle"
                className="avatar-uploader !w-auto"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleImageChange}
              >
                {pathImage ? <img src={pathImage} alt="avatar" className='w-full rounded-full' /> : uploadButton}
              </Upload>
              <Flex vertical>
                <Typography.Title level={5}>Image do perfil</Typography.Title>
                <Typography.Paragraph>
                  Sua imagem deve ter no máximo 250x250 e 1MB
                </Typography.Paragraph>

                <Flex gap={4}>
                  {pathImage && <Button ghost danger icon={<DeleteOutlined />} onClick={handleImageDelete} />}
                </Flex>
              </Flex>
            </Flex>
          </Col>
          <Col span={24} order={3}>
            <Typography.Title level={4}>Telefones</Typography.Title>
          </Col>
          <Col lg={24} order={4}>
            <Row gutter={[8, 8]}>
              <Col sm={24} lg={12}>
                <FormItem control={control} name="phoneNumberFirst" label="Celular">
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                  >
                    {/* @ts-ignore */}
                    {(inputProps: InputProps) => <Input {...inputProps} />}
                  </InputMask>
                </FormItem>
              </Col>
              <Col sm={24} lg={12}>
                <FormItem control={control} name="phoneNumberSecond" label="Telefone">
                  <InputMask
                    mask="(99) 99999-9999"
                    maskChar=""
                  >
                    {/* @ts-ignore */}
                    {(inputProps: InputProps) => <Input {...inputProps} />}
                  </InputMask>
                </FormItem>
              </Col>
            </Row>
          </Col>

          <Col span={24} order={6}>
            <Typography.Title level={4}>Endereço</Typography.Title>
          </Col>

          <Col lg={24} order={7}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <FormItem control={control} name="postalCode" label="CEP" >
                  <Input suffix={loadingAddress && <LoadingOutlined />} onChange={({ target }) => handlePostalCodeChange(target.value)} />
                </FormItem>
              </Col>
              <Col span={20}>
                <FormItem control={control} name="streetName" label="Endereço">
                  <Input />
                </FormItem>
              </Col>

              <Col span={4}>
                <FormItem control={control} name="streetNumber" label="Número">
                  <Input prefix={<NumberOutlined />} />
                </FormItem>
              </Col>

              <Col span={18}>
                <FormItem control={control} name="complement" label="Complemento">
                  <Input />
                </FormItem>
              </Col>

              <Col span={6}>
                <FormItem control={control} name="neighborhood" label="Bairro">
                  <Input />
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem control={control} name="city" label="Cidade">
                  <Input />
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem control={control} name="state" label="Estado">
                  <Input />
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem control={control} name="country" label="Pais" initialValue="Brasil">
                  <Input disabled />
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <FormActions />
      </Form>
    </FormCard>
  );
}
