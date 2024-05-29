import { appConfig } from './config';
import { getToken } from './utils';

export type AuthRequest = {
  email?: string;
  password?: string;
};

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

export async function getStaticProperties(): Promise<any> {
  const response = await fetch(getURI('staticProperties'));
  return response.json();
}

export async function signIn(body: AuthRequest) {
  const url = getURI('login');
  console.log('url: ', url);

  const res = await fetch(getURI('login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data;
}

export async function signUp(body: { email: string; password: string }) {
  const res = await fetch(getURI('signup'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}
