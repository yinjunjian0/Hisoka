import React, { useContext, useEffect, useCallback } from 'react'
import {
  Form,
  Button,
  InputNumber 
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

  const onFill = useCallback(() => {
    form.resetFields()
    form.setFieldsValue(layout);
  }, [form])

  useEffect(() => {
    onFill()
  }, [onFill])


  const onValuesChange = (values: Object) => {
    dispatch({ type: "SETLAYOUT", payload: { layout: values } })
  };

  return (
    <Form {...layout} name="nest-messages" form={form} onValuesChange={onValuesChange} style={{ color: '#FFF' }}>
      <h3>建议 labelCol + wrapperCol = 24</h3>
      <Form.Item
        name={['labelCol', 'span']}
        label={'labelCol.span'}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber type={'number'} min={0} max={24} />
      </Form.Item>
      <Form.Item
        name={['wrapperCol', 'span']}
        label={'wrapperCol.span'}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber type={'number'} min={0} max={24} />
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