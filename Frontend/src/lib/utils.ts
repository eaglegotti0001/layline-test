import { appConfig } from './config';

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

export function saveToken(token: string) {
  if (hasLocalStorage()) {
    localStorage.setItem('auth', token);
  }
}

export function getToken(): string | null {
  if (hasLocalStorage()) {
    return localStorage.getItem('auth');
  }
  return null;
}

export const getURI = (endpoint: string) => {
  return `${appConfig.baseUrl}${endpoint}`;
};

export async function get(endpoint: string): Promise<any> {
  const token = getToken();

  const response = await fetch(getURI(endpoint), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response.json();
}

export async function post(endpoint: string, body: any): Promise<any> {
  const token = getToken();

  const response = await fetch(getURI(endpoint), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function del(endpoint: string, id: string): Promise<any> {
  const token = getToken();

  const response = await fetch(getURI(`${endpoint}/${id}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response.json();
}

export async function put(endpoint: string, id: string, body: any): Promise<any> {
  const token = getToken();

  const response = await fetch(getURI(`${endpoint}/${id}`), {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}
