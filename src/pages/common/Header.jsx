import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header: AntdHeader } = Layout;

const Header = () => {
  return (
    <AntdHeader style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      padding: '0 24px',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
    }}>
      <div className="logo" style={{
        width: '120px',
        height: '31px',
        background: 'rgba(255, 255, 255, 0.2)',
        margin: '16px 24px 16px 0',
        float: 'left'
      }} />
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{
          lineHeight: '64px',
          width: '100%',
          borderBottom: 'none'
        }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/jobs">Jobs</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/companies">Companies</Link>
        </Menu.Item>
      </Menu>
      <div style={{ marginLeft: 'auto' }}>
        <Button type="primary" style={{ marginRight: '10px' }}>
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </AntdHeader>
  );
};

export default Header;
