/**
 * Security and sanitization utilities
 * Protects against XSS, scheme injection (javascript:), and DOM flooding.
 */

const SAFE_URL_PATTERN = /^(https?:\/\/|#|\/)/i;

/**
 * Validates and sanitizes URLs used in href or action attributes.
 * Rejects javascript:, data:, and other potentially dangerous schemes.
 */
export function sanitizeSafeUrl(url?: string, fallback = '#'): string {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (SAFE_URL_PATTERN.test(trimmed)) {
    return trimmed;
  }
  return fallback;
}

/**
 * Sanitizes user input text:
 * - Trims whitespace
 * - Strips non-printable ASCII control characters
 * - Enforces maximum length to prevent DOM memory exhaustion
 */
export function sanitizeTextInput(input: string, maxLength = 200): string {
  if (!input || typeof input !== 'string') return '';
  // Strip control characters (except common whitespace like newlines and tabs)
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return cleaned.trim().slice(0, maxLength);
}

/**
 * Validates email format according to standard RFC patterns.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}
