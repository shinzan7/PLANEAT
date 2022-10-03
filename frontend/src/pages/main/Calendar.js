/*
캘린더
@author 여예원
@since 2022.09.21
*/

import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";

function MainCalendar(props) {
  const [value, setValue] = useState(new Date());
  let today = new Date();

  const mark = [
    "2022-09-01",
    "2022-09-03",
    "2022-09-10",
    "2022-09-17",
    "2022-09-21",
  ]; // 플래닛 지수 날짜 담을 배열
  // todo: 플래닛 지수 별 배열 만들기
  // todo: 날짜 클릭시 우측 영역 보여주기 함수

  const onChange = function (e) {
    setValue(e);
    const year = e.getFullYear();
    let month = e.getMonth() + 1;
    let day = e.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let date = year + "-" + month + "-" + day;
    props.setClickDate(date);
  };

  return (
    <div>
      <Calendar
        onChange={(e) => {
          onChange(e);
        }} // 클릭시 우측에 해당 식단 기록 보여주기
        value={value} // 클릭하는 날짜
        defaultValue={today}
        calendarType="Hebrew" // 일요일시작
        showNeighboringMonth={false} // 이전, 다음 달 없애는 코드
        minDetail="month" // 최소 선택을 월 단위로 하는 코드
        maxDetail="month" // 최대 선택을 월 단위로 하는 코드
        // 날짜의 일을 빼는 코드
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={({ date, view }) => {
          // 추가할 html 태그를 변수 초기화
          let html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (
            props.goodDays.find((x) => x === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(<div className="goodDot"></div>);
          } else if (
            props.normalDays.find(
              (x) => x === moment(date).format("YYYY-MM-DD")
            )
          ) {
            html.push(<div className="normalDot"></div>);
          } else if (
            props.badDays.find((x) => x === moment(date).format("YYYY-MM-DD"))
          ) {
            html.push(<div className="badDot"></div>);
          } else {
            html.push(<div className="unDot"></div>);
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="dotArea">{html}</div>
            </>
          );
        }}
      />
    </div>
  );
}

export default MainCalendar;
