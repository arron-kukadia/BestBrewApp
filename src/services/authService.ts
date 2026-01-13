import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
  fetchAuthSession,
  signInWithRedirect,
} from 'aws-amplify/auth';

export interface SignUpParams {
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface ConfirmSignUpParams {
  email: string;
  code: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface ConfirmResetPasswordParams {
  email: string;
  code: string;
  newPassword: string;
}

export const authService = {
  signUp: async ({ email, password }: SignUpParams) => {
    const result = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    });
    return result;
  },

  confirmSignUp: async ({ email, code }: ConfirmSignUpParams) => {
    const result = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    return result;
  },

  signIn: async ({ email, password }: SignInParams) => {
    const result = await signIn({
      username: email,
      password,
    });
    return result;
  },

  signInWithGoogle: async () => {
    await signInWithRedirect({ provider: 'Google' });
  },

  signOut: async () => {
    await signOut();
  },

  getCurrentUser: async () => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch {
      return null;
    }
  },

  getSession: async () => {
    try {
      const session = await fetchAuthSession();
      return session;
    } catch {
      return null;
    }
  },

  resetPassword: async ({ email }: ResetPasswordParams) => {
    const result = await resetPassword({ username: email });
    return result;
  },

  confirmResetPassword: async ({ email, code, newPassword }: ConfirmResetPasswordParams) => {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  },
};
