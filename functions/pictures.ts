import { apiFetch } from './apiFetch';
import { getToken } from './token';

const apiUrl = process.env.EXPO_PUBLIC_API_BACKEND ?? '';


export const getMarkerPictures = async (id:string) => {
const token = await getToken()
if(token)
{
  //console.log(token)
  return apiFetch(`${apiUrl}/api/markerpictures/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

  };