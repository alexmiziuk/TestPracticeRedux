

/* export const useFetchData = () => {
	 const fetchData = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
		  try {
				const response = await fetch(url); 
				if (!response.ok) {
					 throw new Error(`Could not fetch ${url}, status: ${response.status}`);
				}
				const data = await response.json();
				console.log(data);
				return data;
		  } catch (error) {
				console.error('Error fetching data: ', error);
				throw error;
		  }
	 }, []);

	 return fetchData;
};
 */
import { useCallback } from 'react';


export const useServer = () => {
    const fetchData = useCallback(async (url, method = 'GET', body = null, headers = { 'content-type': 'application/json' }) => {
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data: ', error);
            throw error;
        }
    }, []);

    return fetchData;
};


