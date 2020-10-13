import {
  Button, Col, Form, Input, message, Row,
} from 'antd';
import SelectImage from 'components/SelectImage';
import useAxios from 'hooks/use-axios';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const { useForm } = Form;

function AcademyInfoStep({ values, onValuesChange, nextStep }) {
  const axios = useAxios();
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

  function onSelectImage(image) {
    form.setFieldsValue({ logo: image });
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
            name="logo"
            label="Logo"
            required
          >
            <SelectImage
              name="logo"
              onSelectFile={onSelectImage}
            />
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
