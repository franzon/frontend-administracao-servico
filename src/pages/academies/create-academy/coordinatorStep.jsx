import {
  Button,
  Col, Form, Input, message, Result, Row,
} from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'services/axios';

const { useForm } = Form;

function CoordinatorStep({ values, onValuesChange, previousStep }) {
  const [form] = useForm();
  const [requesting, setRequesting] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  async function createAcademy() {
    setRequesting(true);

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('subdomain', values.subdomain);
      formData.append('address', values.address);
      formData.append('scoreboards', JSON.stringify(values.scoreboards));
      formData.append('coordinator', JSON.stringify(values.coordinator));
      formData.append('logo', values.logo);

      await axios.post('/academy', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      message.success('Academia criada com sucesso!');
      setSuccess(true);
    } catch (error) {
      const { response = {} } = error;
      const { data = {} } = response;
      const { message: msg = 'Ocorreu um erro ao criar a academia.' } = data;

      message.error(msg);
    } finally {
      setRequesting(false);
    }
  }

  function goBack() {
    history.goBack();
  }

  function renderSuccessResult() {
    return (
      <Result
        status="success"
        title="Academia criada com sucesso"
        subTitle="Em alguns minutos será enviado um e-mail para o coordenador contendo a senha de acesso."
        extra={[
          <Button type="primary" onClick={goBack}>Voltar para a lista de academias</Button>,
        ]}
      />
    );
  }

  function onChange(_, allValues) {
    onValuesChange(allValues);
  }

  function renderForm() {
    return (
      <Form
        form={form}
        onValuesChange={onChange}
        initialValues={values}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        name="coordinator-info"
        size="large"
        layout="vertical"
      >
        <Row align="top" gutter={24} style={{ flex: 1 }}>
          <Col span={10}>
            <Form.Item
              name={['coordinator', 'name']}
              label="Nome"
              rules={[{ required: true, message: 'Por favor digite seu nome' }]}
            >
              <Input placeholder="João" />
            </Form.Item>
            <Form.Item
              name={['coordinator', 'email']}
              label="E-mail"
              rules={[{ required: true, message: 'Por favor digite um e-mail' }, { type: 'email', message: 'Digite um e-mail válido' }]}
            >
              <Input
                placeholder="joao@silva.com"
              />
            </Form.Item>
            <Form.Item
              name={['coordinator', 'password']}
              label="Senha"
              rules={[{ required: true, message: 'Por favor digite uma senha' }, { min: 6, message: 'A senha deve conter no mínimo 6 caracteres' }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" gutter={12}>
          <Col>
            <Button size="large" onClick={previousStep}>Anterior</Button>
          </Col>
          <Col>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  size="large"
                  type="primary"
                  loading={requesting}
                  onClick={createAcademy}
                  disabled={!form.isFieldsTouched(true)
                    || form.isFieldsValidating()
                || form.getFieldsError().filter(({ errors }) => errors.length).length}
                >
                  Criar academia
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  return success
    ? renderSuccessResult()
    : renderForm();
}

CoordinatorStep.propTypes = {
  values: PropTypes.object.isRequired,
  onValuesChange: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
};

export default CoordinatorStep;
