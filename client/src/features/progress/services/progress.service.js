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
