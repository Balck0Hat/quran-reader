const BASE_URL = '/api/v1';

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error('تعذّر الاتصال بالخادم');
  }

  if (!response.ok || !body.success) {
    throw new Error(body?.error?.message || 'حدث خطأ غير متوقع');
  }

  return body;
};
