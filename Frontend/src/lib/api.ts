import { ProjectModel } from '@/components/project/projectPanel';
import { getURI, post, get, del, put } from './utils';
import { BidModel } from '@/components/jobs/bidPanel';

export type AuthRequest = {
  email?: string;
  password?: string;
};

export async function signIn(body: AuthRequest) {
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

export async function checkSession(token: string) {
  const url = getURI('check');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return await response.json();
}

export async function createProject(body: any) {
  return await post('project', body);
}

export async function getAllProjectsForUser() {
  return await get('project');
}

export async function getAllProjects() {
  return await get('project/all');
}

export async function getAllOthersProjects() {
  return await get('project/others');
}

export async function getAllMyBids() {
  return await get('bids');
}

export async function getAllMyBidsForProjectId(projectId: string) {
  return await get(`bids/my/${projectId}`);
}

export async function getAllBidsForProjectId(projectId: string) {
  return await get(`bids/${projectId}`);
}

export async function deleteProject(id: string) {
  return await del('project', id);
}

export async function updateProject(id: string, item: ProjectModel) {
  return await put('project', id, item);
}

export async function createBid(body: any) {
  return await post('bids', body);
}

export async function updateBid(id: string, item: BidModel) {
  return await put('bids', id, item);
}

export async function allowPriceUpdate(bid_id: string, allow: boolean) {
  return await post('bids/allowPriceUpdate', { bid_id, allow });
}

export async function updateBidPrice(bid_id: string, price: number) {
  return await post('bids/price', { bid_id, price });
}
