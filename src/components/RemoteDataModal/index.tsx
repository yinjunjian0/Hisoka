import React from 'react'
import { Modal, Button, Tree } from 'antd';

const { TreeNode } = Tree;

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

const data = {
  "seed_id": 14889,
  "job_id": "",
  "args": {
    "$in": [
      {
        "$url": "t"
      }
    ],
    "$const": [
      {
        "seed_info": {
          "seed_id": "123"
        }
      }
    ]
  },
  "global_args": {}
}

const dataToTreeDate = (obj: any, parentTitle: string = '', index: string = '0', type: string = 'object') => {
  const keys = Object.keys(obj)
  const result = []
  for (let i = 0; i < keys.length; i++) {
    let item = obj[keys[i]]
    let title = `${parentTitle ? parentTitle + '.' : ''}${keys[i]}`
    if (type === 'array') title = `${parentTitle ? parentTitle : ''}[${keys[i]}]`
    let treeItem: any = {
      title,
      key: `${index}-${i}`,
      children: []
    }
    if (item instanceof Object) treeItem.children = dataToTreeDate(item, title, `${index}-${i}`, item instanceof Array ? 'array' : 'object')
    result.push(treeItem)
  }
  return result
}

const remoteTreeData = dataToTreeDate(data)

const ObjTree = () => {
  const onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys: any, info: any) => {
    console.log('onCheck', checkedKeys, info);
  };



  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={remoteTreeData}
    />
  );
};


function RemoteDataModal({ remoteDateVis, setRemoteDateVis }: { remoteDateVis: boolean, setRemoteDateVis: Function }) {

  const showModal = () => {
    setRemoteDateVis(true)
  };

  const handleOk = () => {
    setRemoteDateVis(false)
  };


  return (
    <div>
      <Modal
        title="异步数据设置"
        visible={remoteDateVis}
        onOk={handleOk}
        onCancel={() => setRemoteDateVis(false)}
      >
        <ObjTree />
      </Modal>
    </div>
  );
}

export default RemoteDataModal