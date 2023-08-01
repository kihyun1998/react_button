import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;



const CustomRangePicker = () => {
  const [date,setDate] = useState(null);
  const [start,setStart] = useState(false);
  const [end,setEnd] = useState(false);

  const onButtonClick = () => {
    const now = dayjs();

    if (start){
      if (date == null){
        setDate( [now, null] )
      } else if (date[1] == null){
        setDate( [now, null] )
      } else {
        setDate( [now,date[1]])
      }
    }else if (end){
      if (date == null){
        setDate( [null, now] )
      } else if (date[0] == null){
        setDate( [null, now] )
      } else {
        setDate( [date[0], now])
      }
    }
  };

  const saveDate = (dates) => {
    if (dates == null){
      setDate(null)
    } else{
      setDate([dates[0],dates[1]])
    }
  };

  const footer = () => { 
    return (
      <div onClick={onButtonClick} className='btn-time'>
        현재 시간
      </div>
    );
  };

  const range = (start, end) => {
    let array = [];
    for (let i = start; i < end; ++i) {
      array.push(i);
    }
    return array;
  };

  const disabledRangeDate = (current) => {
    return current && current < dayjs("1969-12-31").endOf('day');
  };

  const disabledRangeTime = ( selDate , type) => {
    // type 선택
    if (type === 'start'){
      setStart(true)
      setEnd(false)
    } else if(type === 'end'){
      setStart(false)
      setEnd(true)
    }

    if (selDate <= dayjs("1970-01-01").endOf('day')){
      return {
        disabledHours: () => range(0,9)
      }
    }
    

    
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        renderExtraFooter={footer}
        disabledDate={disabledRangeDate}
        disabledTime={disabledRangeTime}
        showTime={{
          hideDisabledOptions:true,
        }}
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