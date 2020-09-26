import {
  Button, Col, Form, Input, Layout, Row, Table,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'services/axios';

const { Content } = Layout;
const { Search } = Input;
const { Column } = Table;

function AcademiesPage() {
  const [dataSource, setDataSource] = useState({});
  const [page, setPage] = useState(1);
  const history = useHistory();

  const requestDataSource = useCallback(async (search = '') => {
    const response = await axios.get('/academy', {
      params: {
        currentPage: page,
        search,
        perPage: 10,
      },
    });

    setDataSource(response.data);
  }, [page]);

  useEffect(() => {
    requestDataSource();
  }, [requestDataSource]);

  function onSearch(value) {
    requestDataSource(value);
  }

  function openCreateAcademyPage() {
    history.push('/home/academies/create');
  }

  function onRowClick(academy) {
    history.push(`/home/academies/${academy.id}`);
  }

  function renderName(name) {
    return <a href="#/">{name}</a>;
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
          bordered
          loading={!dataSource}
          rowKey="id"
          dataSource={dataSource ? dataSource.data : []}
          rowClassName="cursor"
          pagination={{
            current: page,
            onChange: (x) => setPage(x),
            pageSize: 10,
            total: dataSource && dataSource.pagination ? dataSource.pagination.total : 0,
          }}
          onRow={(record, rowIndex) => ({
            onClick: () => onRowClick(record),
          })}
        >
          <Column title="Nome" dataIndex="name" render={renderName} />
          <Column title="Endereço" dataIndex="address" />
          <Column title="Subdomínio" dataIndex="subdomain" />
        </Table>
      </Content>
    </Layout>
  );
}

export default AcademiesPage;
