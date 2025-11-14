const API_BASE_URL = 'https://apiqa.kylianerp.com/api';

export interface LoginRequest {
  email: string;
  tracking_number: string;
}

export interface LoginResponse {
  status: 'success' | 'error';
  message?: string;
  candidate?: any;
  errors?: {
    email?: string[];
    tracking_number?: string[];
    [key: string]: string[] | undefined;
  };
}

export const candidateLogin = async (
  email: string,
  trackingNumber: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidatelogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        tracking_number: trackingNumber,
      }),
    });

    const data = await response.json();

    // Handle error response
    if (data.status === 'error') {
      const errorMessages: string[] = [];
      if (data.errors) {
        Object.keys(data.errors).forEach((key) => {
          if (Array.isArray(data.errors[key])) {
            errorMessages.push(...data.errors[key]);
          }
        });
      }
      throw new Error(errorMessages.join(', ') || data.message || 'Login failed');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

export interface Employee {
  id?: number;
  name?: string;
  position?: string;
  email?: string;
  avatar?: string;
  [key: string]: any;
}

export interface EmployeesResponse {
  success?: boolean;
  data?: Employee[];
  employees?: Employee[];
  message?: string;
}

export const fetchEmployees = async (
  companyId: number
): Promise<EmployeesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/fetchalleemployees/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch employees');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

