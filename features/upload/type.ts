export type UploadResponse = {
  url: string;
  key: string;
};

export interface RNFile {
  uri: string;
  name: string;
  type: string;
}

export interface UploadPayload{
  file: RNFile,
  category: string,
  appName: string
}