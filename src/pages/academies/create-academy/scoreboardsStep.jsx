import {
  Button, Col, Row,
} from 'antd';
import EditableTable from 'components/EditableTable';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const COLUMNS = [
  {
    title: 'Descrição',
    dataIndex: 'description',
    rules: [{ required: true, message: 'Por favor, informe uma descrição' }],
  },
  {
    title: 'Identificador único',
    dataIndex: 'serialNumber',
    rules: [{ required: true, message: 'Por favor, informe o identificador' }],
  },
  {
    title: 'Token estático',
    dataIndex: 'staticToken',
    rules: [{ required: true, message: 'Por favor, informe o token estático' }, {}],
  },
];

function ScoreboardsStep({
  values, onValuesChange, previousStep, nextStep,
}) {
  const [scoreboards, setScoreboards] = useState(values.scoreboards);

  function saveScoreboardsOnForm() {
    onValuesChange({ scoreboards });
  }

  function onPreviousStepClick() {
    saveScoreboardsOnForm();
    previousStep();
  }

  function onNextStepClick() {
    saveScoreboardsOnForm();
    nextStep();
  }

  function onDataSourceChange(dataSource) {
    setScoreboards(dataSource);
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Row align="top" gutter={24} style={{ flex: 1 }}>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <EditableTable
                columns={COLUMNS}
                keyColumn="serialNumber"
                initialDataSource={scoreboards}
                onDataSourceChange={onDataSourceChange}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="end" gutter={12}>
        <Col>
          <Button size="large" onClick={onPreviousStepClick}>Anterior</Button>
        </Col>
        <Col>
          <Button size="large" type="primary" onClick={onNextStepClick}>Próximo</Button>
        </Col>
      </Row>
    </div>
  );
}

ScoreboardsStep.propTypes = {
  values: PropTypes.object.isRequired,
  onValuesChange: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
};

export default ScoreboardsStep;
