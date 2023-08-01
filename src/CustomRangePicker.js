import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;



const CustomRangePicker = () => {
  const [date,setDate] = useState(null);

  const onButtonClick = () => {
    const now = dayjs();

    if (date==null){
      setDate([now,null])
    }else if (date[1]==null){
      setDate([date[0],now])
    }else if (date[0]==null){
      setDate([now,date[1]])
    }else{
      setDate(now,null)
    }
    

  };

  const saveDate = (dates) => {
    if (dates == null){
      setDate(null)
    }else{
      setDate([dates[0],dates[1]])
    }
  }


  const footer = () => { 
    return (
      <div onClick={onButtonClick} className='btn-time'>
        현재 시간
      </div>
    );
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        renderExtraFooter={footer}
        showTime
        allowClear={true}
        value={date}
        // onChange={setDate}
        onCalendarChange={saveDate}
        size='small'
      />
    </Space>
  );
};

export default CustomRangePicker;