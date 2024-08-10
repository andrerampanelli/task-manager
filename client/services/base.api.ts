import { ApiError, ApiHttpException } from '@/types/api-error.type';

export class BaseApi {
  protected baseUrl = process.env.NEXT_API_URL ?? 'http://localhost:4000';
  protected headers = {
    'Content-Type': 'application/json'
  };

  protected async get<T>(
    url: string,
    headers: RequestInit['headers'] = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: {
        ...this.headers,
        ...headers
      }
    });
    if (!response.ok) {
      const body = (await response.json()) as ApiError;
      throw new ApiHttpException(
        response.status,
        response.statusText,
        body.message.join(', '),
        body.timestamp,
        body.path,
        body.method
      );
    }
    return response.json();
  }

  protected async post<T, K>(
    url: string,
    body: T,
    headers: RequestInit['headers'] = {}
  ): Promise<K> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        ...headers
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const body = (await response.json()) as ApiError;
      throw new ApiHttpException(
        response.status,
        response.statusText,
        body.message.join(', '),
        body.timestamp,
        body.path,
        body.method
      );
    }
    return response.json();
  }

  protected async put<T, K>(
    url: string,
    body: T,
    headers: RequestInit['headers'] = {}
  ): Promise<K> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        ...headers
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const body = (await response.json()) as ApiError;
      throw new ApiHttpException(
        response.status,
        response.statusText,
        body.message.join(', '),
        body.timestamp,
        body.path,
        body.method
      );
    }
    return response.json();
  }

  protected async delete<T>(
    url: string,
    headers: RequestInit['headers'] = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        ...this.headers,
        ...headers
      }
    });
    if (!response.ok) {
      const body = (await response.json()) as ApiError;
      throw new ApiHttpException(
        response.status,
        response.statusText,
        body.message.join(', '),
        body.timestamp,
        body.path,
        body.method
      );
    }
    return response.json();
  }
}
