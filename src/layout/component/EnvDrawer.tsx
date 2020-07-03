import React, { useState, useContext } from 'react'
import { storeContext } from '../../store'
import { Drawer, Button, Input, message } from 'antd';
import { isJson, formatJson } from '../../hooks/utils'

interface envDrawerProps {
  envDrawerVis: boolean,
  setEnvDrawerVis: Function
}

const EnvDrawer = ({ envDrawerVis, setEnvDrawerVis }: envDrawerProps) => {
  const { state, dispatch } = useContext(storeContext);
  const [envVar, setEnvVar] = useState(JSON.stringify({
    name: 'fat cat'
  }, null, 4))

  const EnvDrawerTop = () => <div className="flex bt">
    <Button type="primary" onClick={() => {
      const formattedJson = formatJson(envVar)
      console.log('formattedJson', formattedJson);

      if (!formattedJson) {
        message.error('格式错误，请使用JSON格式')
        return
      }
      setEnvVar((formattedJson))
    }} size="small">格式化</Button><Button type="primary" onClick={() => {
      if (isJson(envVar)) {
        const env = JSON.parse(envVar)
        dispatch({ type: "SETENV", payload: { env } })
        message.success('设置成功')
        setEnvDrawerVis(false)
      } else {
        message.error('格式错误，请使用JSON格式')
      }
    }} size="small">确定</Button>
  </div>

  return <Drawer
    title={<EnvDrawerTop />}
    placement={'left'}
    closable={false}
    visible={envDrawerVis}
    onClose={() => setEnvDrawerVis(false)}
    key={'left'}
    width={'500'}
  >
    <Input.TextArea value={envVar} onChange={e => {
      setEnvVar(e.target.value)
    }} style={{ height: '100%' }} />
  </Drawer>
}
export default EnvDrawer