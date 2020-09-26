import {
  Button, Col, Form, Input, Layout, Row, Table,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'services/axios';

const { Content } = Layout;
const { Search } = Input;

const COLUMNS = [
  { title: 'Nome', dataIndex: 'name' },
  { title: 'Endereço', dataIndex: 'address' },
  { title: 'Sudbomínio', dataIndex: 'subdomain' },
];

function AcademiesPage() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const history = useHistory();

  const requestDataSource = useCallback(async (search = '') => {
    const response = await axios.get('/academy', {
      params: {
        page,
        search,
        perPage: 10,
      },
    });

    setData(response.data);
  }, []);

  useEffect(() => {
    requestDataSource();
  }, [requestDataSource]);

  function onSearch(value) {
    requestDataSource(value);
  }

  function openCreateAcademyPage() {
    history.push('/home/academies/create');
  }

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Form>
        <Row>
          <Col span={8}>
            <Form.Item>
              <Search onSearch={onSearch} size="large" placeholder="Pesquisar academia" />
            </Form.Item>
          </Col>
          <Col flex="auto" />
          <Col>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={openCreateAcademyPage}
              >
                Cadastrar academia

              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Content>
        <Table
          columns={COLUMNS}
          loading={!data}
          rowKey="id"
          dataSource={data ? data.data : []}
          pagination={{
            current: page,
            onChange: (x) => setPage(x),
            pageSize: 10,
            total: 10,
          }}
        />
      </Content>
    </Layout>
  );
}

export default AcademiesPage;
