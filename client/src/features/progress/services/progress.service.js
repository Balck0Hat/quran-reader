import { apiFetch } from '../../../shared/api/client.js';
import { getDeviceId } from '../../../shared/utils/deviceId.js';

export const fetchProgress = async () => {
  const { data } = await apiFetch(`/progress/${getDeviceId()}`);
  return data;
};

export const patchProgress = async (payload) => {
  const { data } = await apiFetch(`/progress/${getDeviceId()}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
  return data;
};

// إرسال فوري عند إغلاق الصفحة — keepalive يُكمل الطلب بعد مغادرة الصفحة
export const sendProgressBeacon = (payload) => {
  fetch(`/api/v1/progress/${getDeviceId()}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
};
