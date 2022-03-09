import { client } from 'client';
import { User } from './interfaces';

export const userQuery = (userId: string) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};

export function getUser() {
  const userToken = localStorage.getItem('user');
  const parsedUserToken = userToken ? JSON.parse(userToken) : localStorage.removeItem('user');
  const googleId = parsedUserToken?.googleId;
  const query = userQuery(googleId);
  return client.fetch(query).then((data: User[]) => {
    let result = data[0] ?? null;
    return result;
  });
}
