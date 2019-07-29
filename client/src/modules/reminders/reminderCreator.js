import uuid from 'uuid';

export const reminderCreator = ({
  id = uuid.v4(),
  createdAt = new Date() / 1,
  reminderExpiration,
  text,
}) => ({
  id,
  createdAt: createdAt instanceof Date ? createdAt / 1 : createdAt,
  reminderExpiration:
    reminderExpiration instanceof Date
      ? reminderExpiration / 1
      : reminderExpiration,
  text,
});
