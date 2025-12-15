// Default lightweight blur placeholder for images that don't have their own blurDataURL.
export const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="%23ffe3c4" offset="0"/><stop stop-color="%23ffeedd" offset="1"/></linearGradient></defs><rect width="10" height="10" fill="%23f7f7f7"/><rect width="10" height="10" fill="url(%23g)" opacity="0.7"/></svg>';
