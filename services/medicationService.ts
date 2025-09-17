import { Medication } from '../types/medication';

export const getMedications = async (): Promise<Medication[]> => {
  // Demo dữ liệu tĩnh, sau này thay bằng gọi API thật
  return [
    { id: '1', name: 'Paracetamol' },
    { id: '2', name: 'Vitamin C' },
  ];
};
