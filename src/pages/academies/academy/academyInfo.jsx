import {
  Button, Col, Form, Input, message, Row, Skeleton,
} from 'antd';
import Editor from 'components/Editor';
import SelectImage from 'components/SelectImage';
import useAxios from 'hooks/use-axios';
import { debounce } from 'lodash';
import React from 'react';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const { useForm } = Form;

function AcademyInfoPage({ academy, onUpdated }) {
  const axios = useAxios();
  const [form] = useForm();

  async function updateAcademy(values) {
    try {
      const rawContentState = convertToRaw(values.additionalInfo.getCurrentContent());

      const additionalInfo = draftToHtml(
        rawContentState,
      );

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('subdomain', values.subdomain);
      formData.append('address', values.address);
      formData.append('logo', values.logo);
      formData.append('additionalInfo', additionalInfo);

      await axios.put(`/academy/${academy.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      message.success('Academia atualizada com sucesso!');
      onUpdated();
    } catch (error) {
      message.error('Ocorreu um erro ao atualizar os dados da academia.');
    }
  }

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
        if (value !== academy.subdomain && !isAvailable) {
          return callback('O subdomínio não está disponível.');
        }

        return callback();
      });
  }

  function onSelectImage(image) {
    form.setFieldsValue({ logo: image });
  }

  function getFormInitialValues() {
    const contentBlock = htmlToDraft(academy.additionalInfo || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    return {
      ...academy,
      additionalInfo: editorState,
    };
  }

  return !academy ? <Skeleton /> : (
    <Form
      form={form}
      initialValues={getFormInitialValues()}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      name="academy-info"
      size="large"
      layout="vertical"
      onFinish={updateAcademy}
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
          <Form.Item
            name="additionalInfo"
            label="Informativos"
          >
            <Editor />
          </Form.Item>
        </Col>
        <Col span={8} offset={4}>
          <Form.Item
            name="logo"
            label="Logo"
          >
            <SelectImage
              name="logo"
              initialImageUrl="https://uilogos.co/img/logomark/atica.png"
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
                htmlType="submit"
                disabled={
                    !form.isFieldsTouched()
                    || form.isFieldsValidating()
                    || form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Atualizar academia
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default AcademyInfoPage;
