import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? "";

import { MarkerInterface } from "@/types/markers";
import { apiFetch } from "./apiFetch";
import { getToken, setToken } from "./token";

export const getMarkers = async () => {
  const token=await getToken()

  if(token)
  {
    
    return apiFetch(`${apiUrl}/api/markers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
};

export const updateMarker = async (marker: MarkerInterface) => {
  return apiFetch(`${apiUrl}/api/markers/${marker._id}`, {
    method: "PUT",
    body: JSON.stringify({ marker }),
  });
};
