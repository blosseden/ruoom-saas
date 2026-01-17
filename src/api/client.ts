import axios, { AxiosInstance, isAxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

export class ApiError extends Error {
  constructor(
    readonly httpStatusCode: number | null,
    url: string,
    message?: string,
  ) {
    super(message || `ApiError occurred during fetch data from ${url}`);
  }

  get hasHttpStatusCode(): boolean {
    return this.httpStatusCode !== null;
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request Interceptor: Add Bearer token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('accessToken');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  },
);

/**
 * Generic GET request
 */
export const getRequest = async <T>(
  url: string,
  params?: unknown,
): Promise<T> => {
  try {
    const res = await apiClient.get<T>(url, { params });
    return res.data;
  } catch (error) {
    console.error(error);

    let status = null;
    let message = 'Unknown error';

    if (isAxiosError(error) && error.response) {
      status = error.response.status;
      message = error.response.data?.message || error.message;
    }

    throw new ApiError(status, url, message);
  }
};

/**
 * Generic POST request
 */
export const postRequest = async <T>(
  url: string,
  params: unknown,
): Promise<T> => {
  try {
    const res = await apiClient.post<T>(url, params);
    return res.data;
  } catch (error) {
    let status = null;
    let message = 'Unknown error';

    if (isAxiosError(error) && error.response) {
      status = error.response.status;
      message = error.response.data?.message || error.message;
    }

    throw new ApiError(status, url, message);
  }
};

/**
 * Generic PUT request
 */
export const putRequest = async <T>(
  url: string,
  params: unknown,
): Promise<T> => {
  try {
    const res = await apiClient.put<T>(url, params);
    return res.data;
  } catch (error) {
    let status = null;
    let message = 'Unknown error';

    if (isAxiosError(error) && error.response) {
      status = error.response.status;
      message = error.response.data?.message || error.message;
    }

    throw new ApiError(status, url, message);
  }
};

/**
 * Generic DELETE request
 */
export const deleteRequest = async <T>(
  url: string,
  params?: unknown,
): Promise<T> => {
  try {
    const res = await apiClient.delete<T>(url, { params });
    return res.data;
  } catch (error) {
    let status = null;
    let message = 'Unknown error';

    if (isAxiosError(error) && error.response) {
      status = error.response.status;
      message = error.response.data?.message || error.message;
    }

    throw new ApiError(status, url, message);
  }
};

export default apiClient;
