// 식사 기록 페이지 > 달력

import React, { useState} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from 'moment';

function MainCalendar() {

    const [value, onChange] = useState(new Date());
    let today = new Date();

    const mark = ["2022-09-01", "2022-09-03", "2022-09-10", "2022-09-17", "2022-09-21"]; // 플래닛 지수 날짜 담을 배열

    return (
        <div>
            <Calendar
                onChange={onChange} // 클릭시 우측에 해당 식단 기록 보여주기
                value={value}
                defaultValue={today}
                calendarType="Hebrew" // 일요일시작
                showNeighboringMonth={false} // 이전, 다음 달 없애는 코드
                minDetail="month"
                maxDetail="month"
                // 날짜의 일을 빼는 코드
                formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
                
                tileContent={({ date, view }) => { 
                    // 추가할 html 태그를 변수 초기화
                    let html = [];
                    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                        html.push(<div className="dot"></div>);
                    } else { 
                        html.push(<div className="unDot"></div>)
                    } 
                    // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                    return (
                      <>
                        <div className="dotArea">
                                {html}
                        </div>
                      </>
                    );
                  }}
            />
        </div>
    );
}

export default MainCalendar;

