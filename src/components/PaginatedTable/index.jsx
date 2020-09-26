import { Table } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'services/axios';

function PaginatedTable({ columns, dataSourceUrl, pageSize }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});

  const requestDataSource = useCallback(async () => {
    const response = await axios.get(dataSourceUrl, {
      params: {
        page,
        perPage: pageSize,
      },
    });

    setData(response);
  }, [dataSourceUrl, page, pageSize]);

  useEffect(() => {
    requestDataSource();
  }, [requestDataSource]);

  return (
    <Table
      columns={columns}
      loading={!data}
      dataSource={data ? data.data : []}
      pagination={{
        current: page,
        onChange: (x) => setPage(x),
        pageSize,
        total: data ? data.pagination.total : 0,
      }}
    />
  );
}

PaginatedTable.propTypes = {
  columns: PropTypes.arrayOf().isRequired,
  dataSourceUrl: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
};

PaginatedTable.defaultProps = {
  pageSize: 10,
};

export default PaginatedTable;
