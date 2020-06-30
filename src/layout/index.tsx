import React, { useState, useContext } from 'react';
import { Layout, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import Form from '../components/Form'
import ConfigForm from '../components/ConfigForm'
import Tags from '../components/ColumnTags'
import { LoadingOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { storeContext } from '../store'

const antIcon = <LoadingOutlined style={{ fontSize: 10 }} spin />;
const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { state, dispatch } = useContext(storeContext);
  const { loading } = state

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout className="mainLayout">
      <Sider trigger={null} collapsible collapsedWidth={300} collapsed={collapsed} className="pad20" width={'40%'} style={{ background: "#FFF" }}>
        <div className="column">
          <h2>Hisoka</h2>
          <div className="flex bt pad10">
            <div></div>
            {<div className="aic" style={{ fontSize: 14 }}>
              模板数据将自动缓存到本地浏览器 <CheckCircleTwoTone style={{ marginLeft: 10 }} />
            </div>}

          </div>
          <Tags />
          <div className="mt10"></div>
          <ConfigForm />
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
    </Layout>
  );
}

export default MainLayout
