import {
  Task,
  User,
  ApiResponse,
  TaskFilters,
  CreateTaskInput,
  UpdateTaskInput,
  API_BASE_URL,
} from "@taskflow/shared";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(
        body?.message ?? `Request failed with status ${res.status}`
      );
    }

    if (res.status === 204) {
      return { data: undefined as T };
    }

    return res.json();
  }

  async getTasks(filters?: TaskFilters): Promise<ApiResponse<Task[]>> {
    const params = new URLSearchParams();
    if (filters?.status) params.set("status", filters.status);
    if (filters?.priority) params.set("priority", filters.priority);
    if (filters?.assigneeId) params.set("assigneeId", filters.assigneeId);
    if (filters?.search) params.set("search", filters.search);
    if (filters?.page) params.set("page", String(filters.page));
    if (filters?.perPage) params.set("perPage", String(filters.perPage));

    const query = params.toString();
    return this.request<Task[]>(`/api/tasks${query ? `?${query}` : ""}`);
  }

  async getTask(id: string): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/api/tasks/${id}`);
  }

  async createTask(input: CreateTaskInput): Promise<ApiResponse<Task>> {
    return this.request<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async updateTask(
    id: string,
    input: UpdateTaskInput
  ): Promise<ApiResponse<Task>> {
    return this.request<Task>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.request(`/api/tasks/${id}`, { method: "DELETE" });
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/api/users");
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/api/users/${id}`);
  }
}

export const api = new ApiClient(API_BASE_URL);
