import { FormType } from '@/@types/form.types'
import FormActions from '@/components/Actions/DefaultFormActions'
import FormCard from '@/components/Cards/FormCard'
import { useFormHelps } from '@/hooks/useFormHelps'
import { disableDateGreaterToday } from '@/utils/dayjs.utils'
import { Patient, PatientFormValidation } from '@/validations/patient.validations'
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { FormItem } from '@components/FormItem'
import { useForm } from '@hooks/useForm'
import { Button, Col, DatePicker, Flex, Form, Input, Row, Typography, message } from 'antd'
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import Image from 'next/image'
import { useMemo, useState } from 'react'


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

export default function PatientForm({ data, onSubmit }: FormType<Patient>) {
  const { control, setValue, handleSubmit, watch } = useForm<Patient>({
    resolver: PatientFormValidation,
    defaultValues: useMemo(() => data, [data]),
  })
  const [loading, setLoading] = useState(false);
  const { repeat } = useFormHelps()
  const { biologicalGenre, pathImage } = watch()


  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setValue('pathImage', url);
      });
    }
  };


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
          <Col span={10}>
            <Row>
              <Col span={24}>
                <FormItem control={control} name="name" label="Nome">
                  <Input />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem control={control} name="birthDate" label="Data de Nascimento">
                  <DatePicker className='w-full' disabledDate={disableDateGreaterToday} />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={12} className='flex justify-end'>
            <Flex gap={4} justify='end'>
              <Upload
                name="pathImage"
                listType="picture-circle"
                className="avatar-uploader !w-auto"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {pathImage ? <Image src={pathImage} alt="avatar" className='w-full rounded-md' /> : uploadButton}
              </Upload>
              <Flex vertical>
                <Typography.Title level={5}>Image do perfil</Typography.Title>
                <Typography.Text type="secondary">Sua imagem deve ter no máximo 250x250 e 1MB</Typography.Text>

                <Flex gap={4}>
                  <Button>Editar Foto</Button>
                  <Button icon={<DeleteOutlined />} />
                </Flex>
              </Flex>
            </Flex>
          </Col>
        </Row>
        <FormActions />
      </Form>
    </FormCard>
  )
}

