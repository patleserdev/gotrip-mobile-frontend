import { apiFetch } from './apiFetch';
import { getToken } from './token';

const apiUrl = process.env.EXPO_PUBLIC_API_BACKEND ?? '';

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