import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import './title.scss'
const items = [
  {
    label: '基础恢复',
    key: 'one',
    icon: <MailOutlined />,
  },
  {
    label: '综合恢复',
    key: 'two',
    icon: <MailOutlined />,
  },
  {
    label: '历史报告',
    key: 'three',
    icon: <MailOutlined />,
  },
];
const itemsObj = {
  'one' : 1,
  'two' : 2,
  'three' : 3
}
const Title = (props) => {
  const [current, setCurrent] = useState('one');
  const onClick = (e) => {
    console.log('click ', e.key);
    setCurrent(e.key);
    props.changeItem(itemsObj[e.key])
  };
  return <div className='titleContent'>
    <div className='sysName'>康复系统</div>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  </div>;
};
export default Title;