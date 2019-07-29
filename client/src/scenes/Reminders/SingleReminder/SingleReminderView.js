import React from 'react';
import styled from 'styled-components';
import * as moment from 'moment';

const SingleReminder = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  transition: 0.2s;
  align-items: stretch;
  width: 100%;
  :hover {
    background: #e7e9ed;
  }
`;

const TextEditField = styled.input.attrs({
  autoFocus: true,
})`
  position: relative;
  font-size: 22px;
  font-family: 'Helvetica Neue', Helvetica, Arial;
  border: 1px solid #999999;
  outline: none;
  height: 95%;
`;

const DeleteButton = styled.div`
  cursor: default;
  position: relative;
  right: 0;
  font-size: 30px;
  color: #cc9a9a;
  border: 0;
  outline: none;
  transition: 0.2s;
  :hover {
    color: red;
  }
`;

const ReminderTime = styled.div`
  font-size: 25px;
  font-family: 'Helvetica Neue', Helvetica, Arial;

  padding: 5px;
`;

const ReminderText = styled.div`
  font-size: 22px;
  font-family: 'Helvetica Neue', Helvetica, Arial;
  padding: 5px;
  cursor: pointer;
`;

export default function({
  reminder,
  deleteThisReminderHandler,
  reminderClicked,
  editedText,
  handleToggleText,
  handleEditText,
  editReminderHandler,
}) {
  // const time = moment(reminder.reminderExpiration).format('HH:mm');
  const time = moment
    .unix(reminder.reminderExpiration / 1000)
    .format('HH:mm');
  return (
    <SingleReminder>
      <ReminderTime>{time}</ReminderTime>
      {'  '}
      <div onClick={handleToggleText}>
        {!reminderClicked && (
          <ReminderText>{reminder.text}</ReminderText>
        )}
        {reminderClicked && (
          <TextEditField
            value={editedText}
            onChange={handleEditText}
            onBlur={editReminderHandler}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editReminderHandler();
              }
            }}
          />
        )}
      </div>

      {!reminderClicked && (
        <DeleteButton onClick={deleteThisReminderHandler}>
          ×
        </DeleteButton>
      )}
    </SingleReminder>
  );
}
