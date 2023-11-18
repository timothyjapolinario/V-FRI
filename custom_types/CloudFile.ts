export type CloudFile = {
  fileName: string;
  downloadUrl: string;
  iconUrl: string;
  contentType: ContentType;
};

export enum ContentType {
  PDF = "pdf",
  IMAGE = "image",
  WORD = "word",
  PRESENTATION = "presentation",
  SHEET = "sheet",
  MEDIA = "media",
  UKNOWN = "unknown",
}
type ExtensionMapper = {
  [key: string]: any;
};
export const extensionMapper: ExtensionMapper = {
  jpeg: ContentType.IMAGE,
  pdf: ContentType.PDF,
  jpg: ContentType.IMAGE,
  png: ContentType.IMAGE,
  xlsx: ContentType.SHEET,
  docx: ContentType.WORD,
  doc: ContentType.WORD,
  ppt: ContentType.PRESENTATION,
  pptx: ContentType.PRESENTATION,
  mp4: ContentType.MEDIA,
  unknown: ContentType.UKNOWN,
};
