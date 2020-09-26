import {
  Avatar, Button, Col, Form, Input, Layout, Row, Typography,
} from 'antd';
import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

function AuthPage() {
  const history = useHistory();

  function onFinish({ email, password }) {
    history.replace('/home');
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
              >
                <Input placeholder="Email" autoComplete="username" />
              </Form.Item>
              <Form.Item
                name="password"
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
