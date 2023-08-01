import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
const App = () => (
  <Space direction="vertical" size={20}>
    <RangePicker showTime />
  </Space>
);
export default App;

