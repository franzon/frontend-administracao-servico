import {
  Avatar, Button, Col, Form, Input, Layout, message, Row, Typography,
} from 'antd';
import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import useAxios from 'hooks/use-axios';

const { Content } = Layout;
const { Title } = Typography;

function AuthPage() {
  const axios = useAxios();
  const history = useHistory();

  async function onFinish({ email, password }) {
    try {
      const { data } = await axios.post('/authentication/admin', { email, password });

      localStorage.setItem('Authorization', data.token);
      history.replace('/home');
    } catch (error) {
      message.error('Verifique se as credenciais estão corretas.');
    }
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%' }}
        >
          <Col span={4} style={{ textAlign: 'center' }}>
            <Avatar size={100} icon={<TeamOutlined />} style={{ marginBottom: 16 }} />
            <Title level={3} type="secondary" style={{ marginBottom: 32 }}>Scoreboard</Title>
            <Form size="large" onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Digite um e-mail.' },
                  { type: 'email', message: 'Digite um e-mail válido.' }]}
              >
                <Input placeholder="Email" autoComplete="username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Digite uma senha.' }, { min: 6, message: 'A senha deve conter pelo menos 6 caracteres.' }]}
              >
                <Input.Password placeholder="Senha" autoComplete="current-password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default AuthPage;
