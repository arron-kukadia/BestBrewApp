import { Amplify } from 'aws-amplify'
import { createURL } from 'expo-linking'

const redirectUri = createURL('/')

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.EXPO_PUBLIC_AWS_USER_POOL_ID,
        userPoolClientId: process.env.EXPO_PUBLIC_AWS_USER_POOL_CLIENT_ID,
        signUpVerificationMethod: 'code',
        loginWith: {
          oauth: {
            domain: process.env.EXPO_PUBLIC_AWS_OAUTH_DOMAIN,
            scopes: ['email', 'profile', 'openid'],
            redirectSignIn: [redirectUri],
            redirectSignOut: [redirectUri],
            responseType: 'code',
            providers: ['Google'],
          },
        },
      },
    },
    API: {
      GraphQL: {
        endpoint: process.env.EXPO_PUBLIC_AWS_APPSYNC_ENDPOINT || '',
        region: process.env.EXPO_PUBLIC_AWS_REGION || 'eu-north-1',
        defaultAuthMode: 'apiKey',
        apiKey: process.env.EXPO_PUBLIC_AWS_APPSYNC_API_KEY || '',
      },
    },
  })
}
