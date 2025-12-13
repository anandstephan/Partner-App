
export interface RNFile {
  uri: string;
  fileName: string;
  type: string;
}

export interface UploadPayload{
  file: RNFile,
  category: string,
  appName: string
}