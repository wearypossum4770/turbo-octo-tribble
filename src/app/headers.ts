export enum CacheControl {
  // Requests to dynamic files, private caching only.
  Default = "private, max-age=604800, stale-while-revalidate=604800",
  EntryFile = "private, max-age=3000, stale-while-revalidate=1206600",
  Geo = "private, max-age=1800",
  Lts = "private, max-age=2419200, stale-while-revalidate=604800",

  // Requests to unchanging file, public caching allowed.
  StaticFile = "public, max-age=31536000",

  // Special cases.
  MetaDataFile = "public, max-age=0",
  ServiceWorkerFile = "no-cache, must-revalidate",
}
export enum ContentType {
  ApplicationJson = "application/json",
  ImageIcon = "image/icon",
  TextCss = "text/css",
  TextJavascript = "text/javascript",
  TextHtml = "text/html",
  TextPlain = "text/plain",
  MultipartFormData = "multipart/form-data",
  FormData = "application/x-www-form-urlencoded",
  Markdown = "text/markdown",
}
export type Charset = "charset=UTF-8";
export enum ContentEncoding {
  Brotli = "br",
  PhilKatz = "pkzip",
}
export enum HeaderKeys {
  CacheControl = "cache-control",
  ContentEncoding = "content-encoding",
  ContentSecurityPolicy = "content-security-policy",
  ContentType = "content-type",
  FrameOptions = "x-frame-options",
}

export const setupKnownMimeTypes = (contentType: string | null): string => {
  switch (contentType) {
    default:
      return "application/octet-stream";
    case ContentType.ApplicationJson:
      return ContentType.ApplicationJson;
    case ContentType.ImageIcon:
      return ContentType.ImageIcon;
    case ContentType.TextCss:
      return ContentType.TextCss;
    case ContentType.TextJavascript:
      return ContentType.TextJavascript;
    case ContentType.TextHtml:
      return ContentType.TextHtml;
    case ContentType.TextPlain:
      return ContentType.TextPlain;
    case ContentType.MultipartFormData:
      return ContentType.MultipartFormData;
    case ContentType.FormData:
      return ContentType.FormData;
    case ContentType.Markdown:
      return ContentType.Markdown;
  }
};
export const setupContentDisposition = (filename: string, name: string) => {
  return `form-data; name="${name}"; filename="${filename}"`;
};
