export interface InputProps {
  label?: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  callback: () => void;
  required?: boolean;
}
