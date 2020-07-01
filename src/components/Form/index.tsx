import React, { useContext } from 'react'
import { Form, Input, Button, Select, Checkbox, Switch, Radio } from 'antd';
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
  let { fields, env } = state

  fields = JSON.parse(JSON.stringify(fields))

  const onFinish = (values: Object) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="Form" onFinish={onFinish} >

      {fields.map((item: any, index) => {
        const itemProps = item?.itemProps
        if (itemProps) {
          Object.keys(itemProps).forEach((item) => {
            var reg = /\$\{(\w+)\}/g
            const value: string = itemProps[item]
            if (typeof value === 'string') {
              let variableArray = value.match(reg)
              if (variableArray) variableArray = variableArray.map(item => item.replace(reg, '$1'))
              let result = value
              variableArray?.forEach(item => {
                result = result.replace('${' + item + '}', env[item])
              })
              fields[index].itemProps[item] = result
            }
          })
        }


        return <Form.Item
          key={index}
          name={[item.name]}
          label={item.label}
          rules={[
            {
              required: item?.required || false,
            },
          ]}

        >
          {item?.type === 'Input' && <Input {...item?.itemProps} />}
          {item?.type === 'Select' && <Select {...item?.itemProps} >
            {item?.itemProps?.customoptions && item?.itemProps?.customoptions.map((item: string, index: number) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
          </Select>}
          {item?.type === 'Checkbox' && <Checkbox  {...item?.itemProps} />}
          {item?.type === 'Switch' && <Switch {...item?.itemProps} />}
          {item?.type === 'Radio' && <Radio.Group>
            {item?.itemProps?.customoptions && item?.itemProps?.customoptions.map((item: string, index: number) => <Radio key={index} value={item}>{item}</Radio>)}
          </Radio.Group>}
        </Form.Item>
      }
      )}
      {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default MainForm