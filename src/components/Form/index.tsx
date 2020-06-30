import React, { useContext } from 'react'
import { Form, Input, Button, Select, Checkbox, Switch } from 'antd';
import { storeContext } from '../../store'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const MainForm = () => {
  const { state, dispatch } = useContext(storeContext);
  const { fields } = state

  const onFinish = (values: Object) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} >
      {fields.map((item: any, index) =>
        <Form.Item
          key={index}
          name={['user', 'name']}
          label={item.name}
          rules={[
            {
              required: item?.config?.required || false,
            },
          ]}
        >
          {item?.config.type == 'Input' && <Input />}
          {item?.config.type == 'Select' && <Select />}
          {item?.config.type == 'Checkbox' && <Checkbox />}
          {item?.config.type == 'Switch' && <Switch />}
        </Form.Item>
      )}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MainForm