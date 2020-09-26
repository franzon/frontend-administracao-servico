import { AppstoreOutlined, DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Col, Dropdown, Layout, Menu, Row, Typography,
} from 'antd';
import ScoreboardIcon from 'assets/icons/scoreboard.png';
import AcademyPage from 'pages/academies/academy';
import CreateAcademyPage from 'pages/academies/create-academy';
import React from 'react';
import {
  Link, Route, Switch, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import AcademiesPage from '../academies';
import DashboardPage from '../dashboard';

const { Content, Sider } = Layout;
const { Text } = Typography;

function HomePage() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const location = useLocation();

  function logOut() {
    localStorage.clear();
    history.replace('/');
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={() => logOut()}>
        Sair
      </Menu.Item>
    </Menu>
  );

  function renderMenu() {
    return (
      <>
        <Row>
          <Col style={{ padding: 12, flex: 1 }}>
            <Row align="middle">
              <Col span={6}>
                <Avatar src={ScoreboardIcon} shape="square" size={36} />
              </Col>
              <Col span={14}>
                <Text style={{ fontWeight: 500, color: 'white' }}>Scoreboard</Text>
                <br />
                <Text type="secondary" style={{ color: 'white', fontSize: '0.8em' }}>
                  Painel administrativo
                </Text>
              </Col>
              <Col span={4}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <Button type="text" style={{ color: 'white' }} icon={<MenuOutlined />} />
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname.split('/').slice(-1).pop()]}>
          <Menu.Item key="home" icon={<DashboardOutlined />}>
            <Link to={url}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="academies" icon={<AppstoreOutlined />}>
            <Link to={`${url}/academies`}>
              Academias
            </Link>
          </Menu.Item>
        </Menu>
      </>
    );
  }

  function setupRoutes() {
    return (
      <Switch>
        <Route exact path={`${path}`}>
          <DashboardPage />
        </Route>
        <Route exact path={`${path}/academies`}>
          <AcademiesPage />
        </Route>
        <Route path={`${path}/academies/create`}>
          <CreateAcademyPage />
        </Route>
        <Route path={`${path}/academies/:id`}>
          <AcademyPage />
        </Route>
      </Switch>
    );
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={230}
      >
        {renderMenu()}
      </Sider>
      <Layout>
        <Content style={{ margin: 16, padding: 16, backgroundColor: 'white' }}>
          {setupRoutes()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomePage;
