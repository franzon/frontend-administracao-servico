import { InboxOutlined } from '@ant-design/icons';
import {
  Button, Col, Form, Input, message, Row, Upload,
} from 'antd';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import axios from 'services/axios';

const { useForm } = Form;
const { Dragger } = Upload;

function AcademyInfoStep({ values, onValuesChange, nextStep }) {
  const [form] = useForm();

  useEffect(() => {
    const fields = Object.keys(form.getFieldsValue())
      .filter((field) => form.getFieldValue(field))
      .map((field) => ({
        name: field,
        touched: true,
      }));

    form.setFields(fields);
  }, [form]);

  async function requestIsSubdomainAvailable(value) {
    try {
      const { data } = await axios.get(`/academy/checkSubdomain/${value}`);

      return data.isAvailable;
    } catch (error) {
      message.error('Ocorreu um erro ao verificar se o subdomínio está disponível');
      return false;
    }
  }

  // eslint-disable-next-line consistent-return
  function subdomainValidator(_, value, callback) {
    if (!value || !value.length) return callback();

    requestIsSubdomainAvailable(value)
      .then((isAvailable) => {
        if (!isAvailable) {
          return callback('O subdomínio não está disponível.');
        }

        return callback();
      });
  }

  function onChange(_, allValues) {
    onValuesChange(allValues);
  }

  function beforeUpload(logo) {
    onValuesChange({ logo });
    return false;
  }

  function removeFile() {
    onValuesChange({ logo: null });
  }

  return (
    <Form
      form={form}
      onValuesChange={onChange}
      initialValues={values}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      name="academy-info"
      size="large"
      layout="vertical"
    >
      <Row align="top" gutter={24} style={{ flex: 1 }}>
        <Col span={10}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor escolha um nome' }]}
          >
            <Input placeholder="Academia" />
          </Form.Item>
          <Form.Item
            name="subdomain"
            label="Subdomínio"
            rules={[{ required: true, message: 'Por favor escolha um subdomínio' },
              { validator: debounce(subdomainValidator, 200) }]}
            hasFeedback
          >
            <Input
              placeholder="academia"
              addonBefore="https://"
              addonAfter=".scoreboard.com"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Endereço"
            rules={[{ required: true, message: 'Por favor digite o endereço' }]}
          >
            <Input placeholder="Rua 123" />
          </Form.Item>
        </Col>
        <Col span={8} offset={4}>
          <Form.Item
            label="Logo"
          >
            <Dragger
              name="logo"
              multiple={false}
              beforeUpload={beforeUpload}
              accept=".jpg,.png"
              fileList={values.logo ? [values.logo] : []}
              onRemove={removeFile}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Clique ou arraste uma imagem</p>
            </Dragger>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                size="large"
                type="primary"
                onClick={nextStep}
                disabled={!form.isFieldsTouched(true)
                    || form.isFieldsValidating()
                || form.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                Próximo
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

AcademyInfoStep.propTypes = {
  values: PropTypes.object.isRequired,
  onValuesChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default AcademyInfoStep;
