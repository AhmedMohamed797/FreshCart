import { apiClient } from "./api.client";

export async function sendDataToSignUp(values) {
  const options = {
    method: "POST",
    url: `/auth/signup`,
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      phone: values.phone,
    },
  };

  const response = await apiClient.request(options);
  return response;
}

export async function sendDataToLogin(values) {
  const options = {
    method: "POST",
    url: `/auth/signin`,
    data: {
      email: values.email,
      password: values.password,
    },
  };

  const response = await apiClient.request(options);
  return response;
}

export async function sendForgotPasswordRequest(values) {
  const options = {
    method: "POST",
    url: `/auth/forgotPasswords`,
    data: {
      email: values.email,
    },
  };

  const response = await apiClient.request(options);
  return response;
}

export async function verifyResetCode(values) {
  const options = {
    method: "POST",
    url: `/auth/verifyResetCode`,
    data: {
      resetCode: values.resetCode,
    },
  };

  const response = await apiClient.request(options);
  return response;
}

export async function resetPassword(values) {
  const options = {
    method: "PUT",
    url: `/auth/resetPassword`,
    data: {
      email: values.email,
      newPassword: values.newPassword,
    },
  };

  const response = await apiClient.request(options);
  return response;
}
