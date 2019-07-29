import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import DatePicker from '../../../components/DatePicker/DatePicker';

const textInputSchema = Yup.object().shape({
  text: Yup.string()
    .matches(/([\s\S]+ ){2}[\s\S]+/, {
      message: 'At least three words required',
    })
    .required(),
});

const MessageInput = styled(Field).attrs({
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SendButton = styled.button`
  font-family: 'Helvetica Neue', Helvetica, Arial;
`;

export default function({
  onReminderCreate,
  dateIsMissing,
  choosenDate,
}) {
  return (
    <Formik
      initialValues={{
        text: '',
      }}
      validationSchema={textInputSchema}
      onSubmit={(values, { resetForm }) => {
        const { text } = values;
        onReminderCreate({ text, reminderExpiration: choosenDate });
        resetForm();
      }}
      render={({ isValid }) => {
        return (
          <Form style={{ width: '100%' }}>
            <InputWrapper>
              <MessageInput name="text" />
              <DatePicker />
              <SendButton
                type="submit"
                disabled={!isValid || dateIsMissing}
              >
                Send
              </SendButton>
            </InputWrapper>
          </Form>
        );
      }}
    />
  );
}
