
import Constants from 'expo-constants';
import { apiFetch } from './apiFetch';
import { getToken } from './token';

const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? '';

export const getCategories = async () => {
const token = await getToken()
if(token)
{
  console.log(token)
  return apiFetch(`${apiUrl}/api/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

  };