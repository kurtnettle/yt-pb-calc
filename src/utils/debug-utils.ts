import {debugTag} from '../index.ts';

export function logD(message: string) {
  console.debug(`[${debugTag}] ${message}`);
}

export function logI(message: string) {
  console.info(`[${debugTag}] ${message}`);
}

export function logW(message: string) {
  console.warn(`[${debugTag}] ${message}`);
}

export function logE(message: string, error?: unknown): void {
  const errorMessage =
    error instanceof Error ? error.message : String(error ?? '');

  console.error(`[${debugTag}] ${message}${error ? `: ${errorMessage}` : ''}`);
}
