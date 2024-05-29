export enum QueryMode {
  Hide,
  Default,
}

export type QueryType = {
  mode: QueryMode;
  method: string;
  endpoint: string;
};

export type ApiResponse = {
  data?: any;
  status: number;
  statusText: string;
  dismissable?: boolean;
};

const hasLocalStorage = () => {
  return typeof window !== 'undefined';
};

export function loadItem(key: string): any {
  if (hasLocalStorage()) {
    const strData = localStorage.getItem(key);
    if (strData) {
      return JSON.parse(strData);
    }
  }

  return null;
}

export function saveItem(key: string, value: any) {
  if (hasLocalStorage()) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function removeItem(key: string) {
  if (hasLocalStorage()) {
    localStorage.removeItem(key);
  }
}

export function clearAll() {
  if (hasLocalStorage()) {
    localStorage.clear();
  }
}

export function getToken(): string | null {
  const result = loadItem('auth');
  if (result && result.success) {
    return result.token;
  }

  return null;
}

export function getCodeTableValue(list, code: string) {
  let toReturn = '';
  if (list && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].tableCd == code) {
        toReturn = list[i].tableE;
        break;
      }
    }
  }
  return toReturn;
}
