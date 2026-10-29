// No servidor não há navigator; a plataforma certa chega por prop.
export const isIos = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /(iPad|iPhone|iPod)/.test(navigator.userAgent);
};
