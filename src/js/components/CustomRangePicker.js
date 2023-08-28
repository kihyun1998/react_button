import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
const { RangePicker } = DatePicker;





const CustomRangePicker = () => {
  const [date,setDate] = useState(null);
  const [start,setStart] = useState(false);
  const [end,setEnd] = useState(false);
  const [mode, setMode] = useState([date,date]);
  const [notDateMode, setNotDateMode] = useState(false);
  const [first,setFirst] = useState(true);



  const range = (start, end) => {
    let array = [];
    for (let i = start; i < end; ++i) {
      array.push(i);
    }
    return array;
  };


  // 현재시간 버튼을 클릭 시 하는 동작
  const onButtonClick = () => {
    const now = dayjs();

    if (start){       // 왼쪽 focus
      if (date === null){ // 0 0 인 경우
        setDate( [now, null] )
      } else if(date[1] !== null){
        if(date[1]<now){
          setDate( [now, null] )
        }else{
          setDate ( [now,date[1]] )
        }
      } else {
        setDate( [now,date[1]])
      } 
    }else if (end){   // 오른쪽 focus
      if (date === null){
        setDate( [null, now] )
      } else if (date[0] !== null) {
        if (date[0] > now){
          setDate( [null,now] )
        }else{
          setDate( [date[0],now] )
        }
      } else {
        setDate( [date[0], now])
      }
    }
    setMode(['date','date'])
  };


  // input태그의 변화를 감지해서 ok누르면 적용되려고
  // 다른데서 setDate하는데 왜 필요한가?
  // >> 일반적으로 ok 눌러서 적용하려면 필요함
  const onCalendarChange = (dates,b) => {
    if (dates === null){
      setDate(null)
    } else{
      setDate([dates[0],dates[1]])
    }
  };

  // 푸터 생성 : onButtonClick 함수를 호출한다.
  const footer = () => { 
    return (
      <div onClick={onButtonClick} className='btn-time'>
        현재 시간
      </div>
    );
  };

  const disabledRangeDate = (current) => {
    // 날짜 금지
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

    // 시간 금지
    if (selDate <= dayjs("1970-01-01").endOf('day')){
      return {
        disabledHours: () => range(0,9)
      }
    }
  };

  // 모드가 바뀌는 걸 감지하는 함수
  // 모드가 start or end에서 date가 아닌 경우 
  // setNotDateMode state를 true로 변경하여 returnMode 함수 실행하도록
  const onPanelChange = (_, newMode) => {
    if (newMode === null){
      return;
    }else{
      setMode(newMode)
      const chkIsDate = (el) => el !== 'date';
      if (newMode.some(chkIsDate)){
        setNotDateMode(true)
      }
    }
  }

  // Focus가 바뀌면 실행
  const onFocus = () => {


    // 이 부분은 mode 초기화를 위해서
    if (notDateMode){
      setMode(['date','date'])
    }else if(first){    // 첫 시작이라면 > 이걸 사용하는 이유는 이렇게 안하면 클릭이 안됨
      setFirst(false)
      setMode(['date','date'])
    }
  }


  const onDateClick = (clickDate) => {

    if (start){       // 왼쪽 focus
      if (date === null){ // 0 0 인 경우
        setDate( [clickDate, null] )
      } else {
        setDate( [clickDate,date[1]])
      }
    }else if (end){   // 오른쪽 focus
      if (date === null){
        setDate( [null, clickDate] )
      } else {
        setDate( [date[0], clickDate])
      }
    }
    setMode(['date','date'])
  };


  return (

    <RangePicker
      style={{fontSize:"24px",width:"100%",height:"100%"}}
      allowClear={true}
      size='small'
      renderExtraFooter={footer}

      // 날짜와 시간 금지
      disabledDate={disabledRangeDate}
      disabledTime={disabledRangeTime}
      // 시간 보여주면서 금지된 값은 안보이게
      showTime={{
        hideDisabledOptions:true,
      }}

      // 값은 date state로 직접 지정
      value={date}
      // 값이 바뀌면 감지하여 saveDate 실행
      onCalendarChange={onCalendarChange}

      // 모드 mode state로 직접 지정
      mode={mode}
      // 모드 변경 감지
      onPanelChange={onPanelChange}
      // focus 위치 감지 (focus란 클릭 시 밑줄)
      onFocus={onFocus}

      format={"YYYY-MM-DD HH:mm:ss"}

      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        
        return (
          <div className="ant-picker-cell-inner" 
          style={{width:"100%",height:"100%"}}
          onClick={()=>{
            onDateClick(current)
          }}>
            {current.date()}
          </div>
        )
      }}
      
    />

  );
};

export default CustomRangePicker;