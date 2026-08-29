export function isElectron(): boolean {
  if (typeof window !== 'undefined' && typeof (window as any).process === 'object' && (window as any).process.type === 'renderer') {
      return true;
  }
  if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
      return true;
  }
  return false;
}
