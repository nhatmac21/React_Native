import api from './api';
import { Reminder } from '../types/reminder';

export const addReminder = async (data: Reminder) => {
  // Gọi API thực tế, ví dụ:
  // const res = await api.post('/reminders', data);
  // return res.data;
  // Demo:
  return { success: true };
};
