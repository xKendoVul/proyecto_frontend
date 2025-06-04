export interface CreateUserDto {
  email: string;
  password: string;
  fullname: string;
}

export interface RegisterResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

export async function registerUser(dto: CreateUserDto): Promise<RegisterResponse> {
  const response = await fetch('http://localhost:4000/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al registrar usuario');
  }
  return data;
}