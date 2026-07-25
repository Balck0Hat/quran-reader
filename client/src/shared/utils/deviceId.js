const STORAGE_KEY = 'rattil-device-id';

export const getDeviceId = () => {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
};
