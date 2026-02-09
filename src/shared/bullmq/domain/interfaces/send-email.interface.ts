export type SendEmailConfirmAccount = {
  email: string;
  code: string;
};

export type SendEmailResetPassword = {
  email: string;
  fullName: string;
  token: string;
};
