const API_URL = import.meta.env.VITE_API_URL;

import type { DuckLog } from "../types/ducklog";


// ログ一覧を取得
export async function fetchDucklogs(): Promise<DuckLog[]> {
  const response = await fetch(`${API_URL}/ducklogs`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ログ詳細を取得
export async function fetchDucklog(id: string): Promise<DuckLog> {
  const response = await fetch(`${API_URL}/ducklogs/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("ログが見つかりません");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 新規ログを作成
export async function createDucklog(data: {
  title: string | null;
  content: string;
}): Promise<DuckLog> {
  const response = await fetch(`${API_URL}/ducklogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ducklog: data,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ログを更新
export async function updateDucklog(
  id: string,
  data: { title: string | null; content: string }
): Promise<DuckLog> {
  const response = await fetch(`${API_URL}/ducklogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ducklog: data,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ログを削除
export async function deleteDucklog(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/ducklogs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
