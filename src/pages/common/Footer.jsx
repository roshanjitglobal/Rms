import React from 'react';
import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter style={{
      textAlign: 'center',
      backgroundColor: '#f0f2f5',
      padding: '16px 50px',
      borderTop: '1px solid #f0f0f0'
    }}>
      <p>© {new Date().getFullYear()} Recruitment Management System. All rights reserved.</p>
    </AntdFooter>
  );
};

export default Footer;
