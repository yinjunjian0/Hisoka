import React, { useState, } from 'react';
import { Layout, Button, Input, Collapse } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';


import { CheckCircleTwoTone } from '@ant-design/icons';

import Form from '../components/Form'
import BasicConfigForm from '../components/BasicConfigForm'
import ComponentConfigForm from '../components/ComponentConfigForm'
import Tags from '../components/ColumnTags'
import EnvDrawer from './component/EnvDrawer'

const { Panel } = Collapse;
const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [envDrawerVis, setEnvDrawerVis] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout className="mainLayout">
      <EnvDrawer envDrawerVis={envDrawerVis} setEnvDrawerVis={setEnvDrawerVis}></EnvDrawer>
      <Sider trigger={null} collapsible collapsedWidth={300} collapsed={collapsed} className="pad20" width={'40%'} style={{ background: "#FFF" }}>
        <div className="column">
          <h2>Hisoka</h2>
          <div className="flex bt ptb10 aic">
            <div>
              <Button type="primary" onClick={() => setEnvDrawerVis(true)} size="small">设置环境变量</Button>
            </div>
            {<div className="aic" style={{ fontSize: 14 }}>
              模板数据将自动缓存到本地浏览器 <CheckCircleTwoTone style={{ marginLeft: 10 }} />
            </div>}
          </div>
          <Tags />
          <div className="mt10"></div>
          <Collapse defaultActiveKey={['1']} onChange={e => e}>
            <Panel header="基本信息" key="1">
              <BasicConfigForm />
            </Panel>
            <Panel header="组件配置" key="2">
              <ComponentConfigForm />
            </Panel>
          </Collapse>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 20px', color: "#FFF" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Form />
        </Content>
      </Layout>
    </Layout >
  );
}

export default MainLayout
