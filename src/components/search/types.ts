export interface SearchProps {
  keySearch: string;
  setKeySearch: React.Dispatch<React.SetStateAction<string>>;
  callbackKeySearch: (keySearch: string) => void;
  callback: () => void;
  clear: () => void;
}
