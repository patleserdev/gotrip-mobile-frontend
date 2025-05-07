const apiUrl = process.env.EXPO_PUBLIC_API_BACKEND ?? '';

import { MarkerInterface } from "@/types/markers";
import { apiFetch } from "./apiFetch";
import { getToken, setToken } from "./token";

/**
 * Récupération des markers
 * @returns 
 */
export const getMarkers = async () => {
  const token = await getToken();

  if (token) {
    return apiFetch(`${apiUrl}/api/markers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

/**
 * Maj d'un marker
 * @param marker 
 * @returns 
 */
export const updateMarker = async (marker: MarkerInterface) => {
  return apiFetch(`${apiUrl}/api/markers/${marker._id}`, {
    method: "PUT",
    body: JSON.stringify({ marker }),
  });
};
