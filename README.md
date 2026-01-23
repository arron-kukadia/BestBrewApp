# BestBrew ☕

A modern coffee tracking app to log, rate, and discover your perfect coffee.
NOTE: This app is currently in development and is not yet available for download. AI has been used to assist with the development of this app.

## Trello Board

https://trello.com/b/NVC5Lenu/bestbrew-app

## Tech Stack

- **Framework:** React Native with Expo (managed workflow)
- **Language:** TypeScript (strict mode)
- **State Management:** Zustand with AsyncStorage persistence
- **Caching:** TanStack Query for server state
- **Navigation:** React Navigation (Native Stack + Bottom Tabs)
- **Authentication:** AWS Amplify v6 (Cognito User Pool + Google OAuth)
- **UI:** Custom component library with dark/light mode support
- **Icons:** @expo/vector-icons (MaterialIcons)
- **Lists:** @shopify/flash-list
- **Animations:** react-native-reanimated
- **Backend:** AWS AppSync (GraphQL) + DynamoDB
- **AI:** OpenAI GPT-4o-mini via AWS Lambda
- **Testing:** React Native Testing Library
- **AI tools:** Windsurf for development with Cascade for AI assistance

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator or physical device

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```
EXPO_PUBLIC_AWS_USER_POOL_ID=your_user_pool_id
EXPO_PUBLIC_AWS_USER_POOL_CLIENT_ID=your_client_id
EXPO_PUBLIC_AWS_OAUTH_DOMAIN=your_oauth_domain
EXPO_PUBLIC_AWS_REGION=your_region
EXPO_PUBLIC_AWS_APPSYNC_ENDPOINT=your_appsync_endpoint
EXPO_PUBLIC_AWS_APPSYNC_API_KEY=your_appsync_api_key
EXPO_PUBLIC_AWS_S3_BUCKET=your_s3_bucket
EXPO_PUBLIC_AWS_RECOMMENDATIONS_ENDPOINT=your_lambda_api_endpoint
```

### Running the App

**Development (Expo Go):**

```bash
npm start
```

**Development Build (required for native modules):**

```bash
npm run build:dev:ios
npm run build:dev:android
```

**Start with dev client:**

```bash
npm run start:dev
```

## AWS Architecture

### Services

| Service | Purpose |
|---------|---------|
| **Cognito** | User authentication (email/password + Google OAuth) with User Pool and Identity Pool |
| **AppSync** | GraphQL API for all data operations with pipeline resolvers |
| **DynamoDB** | NoSQL database storing coffee entries and custom flavour notes |
| **S3** | Image storage for coffee photos with signed URL access |
| **Lambda** | Serverless functions for S3 URL signing and AI insights (OpenAI GPT-4o-mini) |

### Data Flow

1. **Authentication:** Cognito handles sign-up/sign-in and provides tokens for API access
2. **Data Operations:** AppSync GraphQL queries/mutations interact with DynamoDB
3. **Image Handling:** Images uploaded to S3, Lambda generates signed URLs on fetch
4. **AI Insights:** Lambda function processes coffee data through OpenAI for recommendations

## License

Private - All rights reserved
