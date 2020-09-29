import {
  ArrowLeftOutlined, InfoCircleOutlined, InsertRowBelowOutlined, UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  Button, Col, message, Row, Spin, Tabs, Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'services/axios';
import AcademyInfoPage from './academyInfo';
import CoordinatorsPage from './coordinators';
import ScoreboardsPage from './scoreboards';

const { Title } = Typography;
const { TabPane } = Tabs;

function AcademyPage() {
  const history = useHistory();
  const [academy, setAcademy] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const requestData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/academy/${id}`);

      setAcademy(data);
    } catch (error) {
      message.error('Não foi possível ');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    requestData();
  }, [requestData]);

  function goBack() {
    history.goBack();
  }

  function renderName() {
    if (loading) return <Spin />;

    if (academy && academy.name) return academy.name;

    return 'Erro ao obter o nome da academia';
  }

  return (
    <>
      <Row gutter={24}>
        <Col>
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={goBack}
          />
        </Col>
        <Col>
          <Title level={3}>{renderName()}</Title>
        </Col>
        <Col flex="auto" />
        <Col>
          <Button href={academy ? `https://${academy.subdomain}.scoreboard.tech` : ''}>Acessar página da academia</Button>
        </Col>
      </Row>
      <Row style={{ height: '100%' }}>
        <Col
          span={24}
          style={{
            height: '100%', display: 'flex', flexDirection: 'column', padding: 24,
          }}
        >
          <Tabs defaultActiveKey="1" className="tabs">
            <TabPane
              tab={(
                <span>
                  <InfoCircleOutlined />
                  Dados da academia
                </span>
      )}
              key="1"
            >
              <AcademyInfoPage academy={academy} onUpdated={requestData} />
            </TabPane>
            <TabPane
              tab={(
                <span>
                  <InsertRowBelowOutlined />
                  Placares
                </span>
      )}
              key="2"
            >
              <ScoreboardsPage academy={academy} />
            </TabPane>
            <TabPane
              tab={(
                <span>
                  <UsergroupAddOutlined />
                  Coordenadores
                </span>
      )}
              key="3"
            >
              <CoordinatorsPage academy={academy} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}

export default AcademyPage;
