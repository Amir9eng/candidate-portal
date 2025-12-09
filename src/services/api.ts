const API_BASE_URL = 'https://api.kylianerp.com/api';
export const BASE_URL = 'https://api.kylianerp.com';

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
      throw new Error(
        errorMessages.join(', ') || data.message || 'Login failed'
      );
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
  id: number;
  user_id: number;
  company_id: number;
  company_unique_id: string;
  employee_id: string | null;
  user_type: number;
  employee_fristname: string;
  employee_lastname: string;
  employee_designation: string | null;
  reporting_to: string | null;
  employee_phone1: string | null;
  profile_image_url: string | null;
  department_id: number | null;
  employment_type: number;
  employee_officialemail: string | null;
  employee_address: string | null;
  employee_nationality: string | null;
  city: string | null;
  blood_group: string | null;
  province_state: string | null;
  'postcode/zipcode': string | null;
  employee_state: string | null;
  employee_local_government: string | null;
  employee_middle_name: string | null;
  experience: string | null;
  current_salary: string | null;
  source_of_hire: string | null;
  employee_nick_name: string | null;
  offerletter_url: string | null;
  skill_set: string | null;
  Highest_qualification: string | null;
  paddtional_info: string | null;
  employee_email: string;
  employee_position: string | null;
  employee_phone2: string | null;
  employee_date_of_birth: string | null;
  employee_place_of_birth: string | null;
  employee_Identity_cardnumber: string | null;
  employee_maritalstatus: string | null;
  employee_sex: string | null;
  employee_department: string | null;
  employeeletter_url: string | null;
  employeepolicy_url: string | null;
  employee_number_of_children: string | null;
  employee_means_of_identification: string | null;
  employee_manager: string | null;
  employment_date: string | null;
  guarantor_frist_Name: string | null;
  guarantor_last_Name: string | null;
  guarantor_phone_number: string | null;
  guarantor_email_address: string | null;
  guarantor_address: string | null;
  employee_grelationship: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  fathers_name: string | null;
  mothers_name: string | null;
  spouses_name: string | null;
  country: string | null;
  basic_salary: string | null;
  account_number: string | null;
  bank_name: string | null;
  payment_method: string | null;
  name_of_next_of_kin: string | null;
  relationship_nok: string | null;
  address_nok: string | null;
  mobile_no_nok: string | null;
  paygrade_id: number | null;
  gradelevel_id: number | null;
  lastlogin: string | null;
  offerletter: string | null;
  branch: string | null;
  account_status: number;
  bank_code: string | null;
  account_name: string | null;
  signature: string | null;
  allowance: string | null;
  allowance_amount: string | null;
  allowance_note: string | null;
  allowance_status: number;
  deduction: string | null;
  deduction_amount: string | null;
  deduction_note: string | null;
  deduction_status: number;
  [key: string]: any;
}

export interface EmployeesResponse {
  success?: boolean;
  data?: Employee[];
  employees?: Employee[];
  message?: string;
}

export interface FetchEmployeesRequest {
  company_id: number;
  id?: number;
}

export const fetchEmployees = async (
  companyId: number,
  employeeId?: number
): Promise<EmployeesResponse> => {
  try {
    // Build URL with query parameters
    // The API only supports GET method, so we send parameters as query strings
    let url = `${API_BASE_URL}/fetchalleemployees/${companyId}`;

    // Add query parameters
    const params = new URLSearchParams();
    params.append('company_id', companyId.toString());

    // Include id if provided (required for the API to return data)
    const idToUse = employeeId || 911115; // Use employeeId if provided, otherwise use default
    params.append('id', idToUse.toString());

    url += `?${params.toString()}`;

    const response = await fetch(url, {
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

export interface AcceptOfferRequest {
  tracking_number: string;
  email: string;
  company_id: number;
}

export interface AcceptOfferResponse {
  employees?: {
    id: number;
    offer_accepted: boolean;
    [key: string]: any;
  };
  message: string;
}

export const acceptOffer = async (
  trackingNumber: string,
  email: string,
  companyId: number
): Promise<AcceptOfferResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/acceptoffer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tracking_number: trackingNumber,
        email: email,
        company_id: companyId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to accept offer');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};
