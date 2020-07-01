import React, { useContext, useEffect, useCallback } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Tag
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
    console.log(values);
    dispatch({ type: "SETFIELD", payload: { ...values } })
  };

  return (
    <Form {...layout} name="nest-messages" form={form} onValuesChange={onValuesChange} style={{ color: '#FFF' }}>
      <Form.Item
        name={['itemProps', 'placeholder']}
        label="placeholder"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['itemProps', 'customoptions']}
        label="options"
      >
        <Checkbox.Group>
          <Checkbox value="A" style={{ lineHeight: '32px' }}>A</Checkbox>
          <Checkbox value="C" style={{ lineHeight: '32px' }}>C</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </Form>
  );
};

export default ConfigForm