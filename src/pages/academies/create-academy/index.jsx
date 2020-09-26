import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button, Col, Row, Steps, Typography,
} from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AcademyInfoStep from './academyInfoStep';
import CoordinatorStep from './coordinatorStep';
import ScoreboardsStep from './scoreboardsStep';

const { Title } = Typography;
const { Step } = Steps;

const INITIAL_VALUES = {
  scoreboards: [],
};

function CreateAcademyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();
  const [values, setValues] = useState(INITIAL_VALUES);

  function goBack() {
    history.replace('/home/academies');
  }

  function previousStep() {
    setCurrentStep((step) => step - 1);
  }

  function nextStep() {
    setCurrentStep((step) => step + 1);
  }

  function onValuesChange(changedValues) {
    setValues((oldValues) => ({ ...oldValues, ...changedValues }));
  }

  function renderContent() {
    if (currentStep === 0) {
      return (
        <AcademyInfoStep
          values={values}
          onValuesChange={onValuesChange}
          nextStep={nextStep}
        />
      );
    }

    if (currentStep === 1) {
      return (
        <ScoreboardsStep
          values={values}
          onValuesChange={onValuesChange}
          previousStep={previousStep}
          nextStep={nextStep}
        />
      );
    }

    return (
      <CoordinatorStep
        values={values}
        onValuesChange={onValuesChange}
        previousStep={previousStep}
      />
    );
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
          <Title level={3}>Cadastrar academia</Title>
        </Col>
      </Row>
      <div style={{
        padding: 16, height: '95%',
      }}
      >
        <Steps current={currentStep}>
          <Step title="Dados da academia" />
          <Step title="Placares (opcional)" />
          <Step title="Coordenador" />
        </Steps>
        <Row style={{ height: '100%' }}>
          <Col
            span={24}
            style={{
              padding: 16, paddingTop: 48, height: '100%', display: 'flex', flexDirection: 'column',
            }}
          >
            {renderContent()}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CreateAcademyPage;
