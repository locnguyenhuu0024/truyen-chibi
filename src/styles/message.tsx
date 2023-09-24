import { Alert } from "antd";
import { ArgsProps } from "antd/es/message";

export const messageSuccess = (content: string) : ArgsProps => ({
  type: 'success',
  content: <Alert type="success" message={content} />,
  icon: <></>
});

export const messageFailed = (content: string) : ArgsProps => ({
  type: 'error',
  content: <Alert type="error" message={content} />,
  icon: <></>
});