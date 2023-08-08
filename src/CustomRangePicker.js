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
  const [open,setOpen] = useState(false);
  const [isOpen,setIsOpen] = useState(false);



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
      if (date == null){ // 0 0 인 경우
        setDate( [now, null] )
      } else if (date[1] == null){ // 1 0인 경우 now null
        setDate( [now, null] )
      } else if (date[0] == null){
        setDate( [now,date[1]])  
      } else {
        setDate( [now,date[1]])
      }
    }else if (end){   // 오른쪽 focus
      if (date == null){
        setDate( [null, now] )
      } else if (date[0] == null){
        setDate( [null, now] )
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
    console.log(b)
    if (dates == null){
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
    if (newMode == null){
      return;
    }else{
      setMode(newMode)
      console.log(newMode)
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
    
    // // 값을 확인을 누르지 않았을 때 다른데 가면 초기화하기 위해서
    // // setIsOpen의 상태와 연관있음
    // if (isOpen){
    //   setIsOpen(false)
    // }else{    // open되어 있던 상태에서만 동작하도록 하는 코드
    //   if (date==null){
    //     console.log(2)
    //     setDate([null,null])
    //     setOpen(false)
    //     setTimeout(()=>{
    //       setOpen(true)
    //     },1)
    //   }else if(date[0] == null && date[1] == null){
    //     console.log(3)
    //     setDate([null,null])
    //     setOpen(false)
    //     setTimeout(()=>{
    //       setOpen(true)
    //     },1)
    //   }
    // }
  }


  // const onClick = () => {

  //   // 달력 초기화 함수
  //   if (date != null){
  //     let cp0 = date[0]
  //     let cp1 = date[1]
  //     if (cp0 != null && cp1 != null){
  //       cp0 = cp0.format("YYYY-MM-DD HH:mm:ss")
  //       cp1 = cp1.format("YYYY-MM-DD HH:mm:ss")
  //       const cpDate0 = dayjs(cp0)
  //       const cpDate1 = dayjs(cp1)
  //       setDate([cpDate0,cpDate1])
  //     }else if(cp0 != null && cp1 == null){
  //       cp0 = cp0.format("YYYY-MM-DD HH:mm:ss")
  //       const cpDate0 = dayjs(cp0)
  //       setDate([cpDate0,null])
  //     }else if(cp1 != null && cp0 == null){
  //       cp1 = cp1.format("YYYY-MM-DD HH:mm:ss")
  //       const cpDate1 = dayjs(cp1)
  //       setDate([null,cpDate1])
  //     }
  //   }
  // }

  // open 값 바뀌면 open 적용
  const onOpenChange = (val) => {
    setOpen(val)
    if(val){
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
  }


  const onDateClick = (clickDate) => {

    if (start){       // 왼쪽 focus
      if (date == null){ // 0 0 인 경우
        setDate( [clickDate, null] )
      } else if (date[1] == null){
        setDate( [clickDate, null] )
      } else if (date[0] == null){
        setDate( [clickDate,date[1]])  
      } else {
        setDate( [clickDate,date[1]])
      }
    }else if (end){   // 오른쪽 focus
      if (date == null){
        setDate( [null, clickDate] )
      } else if (date[0] == null){
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

      // input click 시 달력 초기화(선택했던 날짜로)
      // 선택한 날짜 없으면 초기화안됨
      // onClick={onClick}
      format={"YYYY-MM-DD HH:mm:ss"}

      open={open}
      onOpenChange={onOpenChange}

      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        
        return (
          <div className="ant-picker-cell-inner" onClick={()=>{
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