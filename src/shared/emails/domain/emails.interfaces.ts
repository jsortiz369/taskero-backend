export type DataSendEmail = {
  to: string | string[];
  subject: string;
  text?: string;
  html: string;
};
