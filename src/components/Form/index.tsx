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
  const { state } = useContext(storeContext);
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
              required: item?.required || false,
            },
          ]}

        >
          {item?.type === 'Input' && <Input {...item} />}
          {item?.type === 'Select' && <Select {...item} />}
          {item?.type === 'Checkbox' && <Checkbox  {...item} />}
          {item?.type === 'Switch' && <Switch {...item} />}
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