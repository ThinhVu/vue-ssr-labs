export const isSSR = typeof window === 'undefined';
export const _fetch = isSSR ? (await import('node-fetch')).default : fetch;
