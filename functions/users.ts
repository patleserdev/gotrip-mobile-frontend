import Constants from "expo-constants";

const apiUrl = Constants.expoConfig?.extra?.apiUrl ?? "";

import { UserInterface } from "@/types/users";
import { apiFetch } from "./apiFetch";

export const getUsers = async () => {
  return apiFetch(`${apiUrl}/api/users`, {
    method: "GET",
  });
};

export const updateUser = async (user: UserInterface) => {
  return apiFetch(`${apiUrl}/api/users/${user._id}`, {
    method: "PUT",
    body: JSON.stringify({ user }),
  });
};

export const addUser = async (user: UserInterface) => {
 
  return apiFetch(`${apiUrl}/api/users`, {
    method: "POST",
    body: JSON.stringify( user ),
  });
};

export const connectUser = async (user: UserInterface) => {
 
  return apiFetch(`${apiUrl}/api/login`, {
    method: "POST",
    body: JSON.stringify( user ),
  });
};
