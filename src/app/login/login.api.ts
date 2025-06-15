export interface LoginUserDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

export async function loginUser(dto: LoginUserDto): Promise<LoginResponse> {
  const response = await fetch('http://localhost:4000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Error al iniciar sesión');
  }
  return data;
}
