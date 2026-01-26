export type DataSendEmail = {
  titleFrom?: string;
  to: string | string[];
  subject: string;
  text?: string;
  html: string;
};
