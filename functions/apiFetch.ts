// utils/apiFetch.ts
export const apiFetch = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
    //console.log(response)

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    if(data.result)
    {
      return data?.datas ?? data; // flexible selon ta structure

    }
    else
    {
      return data?.datas ?? data; // flexible selon ta structure
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
};
