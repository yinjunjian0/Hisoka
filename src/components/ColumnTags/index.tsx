import React, { useState, useContext } from 'react'
import { Tag, Input, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { storeContext, fieldItem } from '../../store'

type tagsType = Array<string>

const { CheckableTag } = Tag;

function ColumnTags() {
  const { state, dispatch } = useContext(storeContext);
  const [inputVisible, setInputVis] = useState(false)
  const [inputValue, setInputVal] = useState('')
  const { fields, selectedTag } = state

  const showInput = () => {
    setInputVis(true)
  };

  const confirm = (name: string) => {
    dispatch({ type: "DELETEFIELD", payload: { name } })
  }

  const handleInputChange = (e: any) => {
    setInputVal(e.target.value)
  };

  const handleInputConfirm = () => {
    if (fields.filter(item => item.name === inputValue).length > 0) {
      message.error('字段名需唯一')
      return
    }
    if (inputValue) {
      dispatch({ type: "ADDFIELD", payload: { name: inputValue } })
    }
    setInputVis(false)
    setInputVal('')
  };

  return <div>
    {fields.map((item: fieldItem, index) => (
      <Popconfirm
        key={item.id}
        title="删除此元素"
        onConfirm={() => confirm(item.name)}
        okText="是"
        cancelText="否"
        trigger={'hover'}
      >
        <CheckableTag
          checked={item.id === selectedTag.id}
          onChange={checked => {
            dispatch({ type: "SETSELECTEDTAG", payload: { id: item.id } })
          }}
          style={{ marginBottom: 10 }}
        >
          {item.label}({item.name})
        </CheckableTag>
      </Popconfirm>
    ))}
    {inputVisible && (
      <Input
        autoFocus
        type="text"
        size="small"
        style={{ width: 78 }}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    )}
    {!inputVisible && (
      <Tag onClick={showInput} className="site-tag-plus">
        <PlusOutlined />
      </Tag>
    )}
  </div>
}

export default ColumnTags
