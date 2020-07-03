import React, { useState, useContext } from 'react'
import { storeContext } from '../../store'
import { Drawer, Button, Input, message } from 'antd';
import { isJson, formatJson } from '../../hooks/utils'

interface envDrawerProps {
  configDrawerVis: boolean,
  setConfigDrawerVis: Function
}

const ConfigDrawer = ({ configDrawerVis, setConfigDrawerVis }: envDrawerProps) => {
  const { state, dispatch } = useContext(storeContext);

  const { fields, env, layout } = state
  const configJson = JSON.stringify({
    fields, env, layout
  }, null, 4)

  const EnvDrawerTop = () => <div className="flex bt">
    <Button type="primary" onClick={() => {

    }} size="small">复制</Button><Button type="primary" onClick={() => {

    }} size="small">导出</Button>
  </div>

  return <Drawer
    title={<EnvDrawerTop />}
    placement={'right'}
    closable={false}
    visible={configDrawerVis}
    onClose={() => setConfigDrawerVis(false)}
    key={'right'}
    width={'500'}
  >
    <Input.TextArea value={configJson} onChange={e => {
    }} style={{ height: '100%' }} />
  </Drawer>
}
export default ConfigDrawer