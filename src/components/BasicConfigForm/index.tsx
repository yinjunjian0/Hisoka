import React, { useContext, useEffect, useCallback } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
} from 'antd';
import { storeContext } from '../../store'


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const ConfigForm = () => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext(storeContext);
  const { selectedTag } = state

  const onFill = useCallback(() => {
    form.resetFields()
    form.setFieldsValue(selectedTag);
  }, [selectedTag, form])

  useEffect(() => {
    onFill()
  }, [selectedTag, onFill])


  const onValuesChange = (values: Object) => {
    dispatch({ type: "SETLOADING", payload: { loading: true } })
    dispatch({ type: "SETFIELD", payload: { ...values } })
  };

  return (
    <Form {...layout} name="nest-messages" form={form} onValuesChange={onValuesChange} style={{ color: '#FFF' }}>
      <Form.Item
        name={['name']}
        label={'key'}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['label']}
        label={'字段名(显示)'}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['required']}
        valuePropName="checked"
        label="必填"
      // rules={[
      //   { validator: (_, value) => value ? Promise.resolve() : Promise.reject('请选择') },
      // ]}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name={['type']}
        label="类型"
        rules={[
          {
            required: true,
            message: '选个类型'
          },
        ]}
      >
        <Radio.Group>
          <Radio value="Input">Input</Radio>
          <Radio value="Select">Select</Radio>
          <Radio value="Checkbox">Checkbox</Radio>
          <Radio value="Switch">Switch</Radio>
          <Radio value="Radio">Radio</Radio>
        </Radio.Group>
      </Form.Item>
      {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default ConfigForm