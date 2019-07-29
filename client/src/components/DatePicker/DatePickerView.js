import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import styled from 'styled-components';

const StyledDatePicker = styled(DatePicker).attrs({
  placeholder: 'Type your reminder here...',
})`
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, Arial;
  font-size: 13px;
  line-height: 22px;
  color: black;
  outline: none;
  ::-webkit-input-placeholder {
    font-family: 'Helvetica Neue', Helvetica, Arial;
    font-size: 13px;
    line-height: 22px;
    color: #97a3b4;
  }
  :-ms-input-placeholder {
    font-family: 'Helvetica Neue', Helvetica, Arial;
    font-size: 13px;
    line-height: 22px;
    color: #97a3b4;
  }
`;

export default function({ date, handleDateChange, minTime }) {
  return (
    <>
      <StyledDatePicker
        selected={date}
        selectsStart
        onChange={handleDateChange}
        minDate={new Date()}
        minTime={minTime}
        maxTime={moment()
          .endOf('day')
          .toDate()}
        placeholder="Click to select a date"
        timeIntervals={5}
        dateFormat="dd LLL yyyy HH:mm"
        timeFormat="HH:mm"
        showTimeSelect
      />
    </>
  );
}
