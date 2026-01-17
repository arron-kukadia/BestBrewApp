# BestBrew ☕

A modern coffee tracking app to log, rate, and discover your perfect coffee.
NOTE: This app is currently in development and is not yet available for download. AI has been used to assist with the development of this app.

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

## Project Structure

```
src/
├── api/                 # TanStack Query hooks
├── components/
│   ├── common/          # Reusable UI components
│   ├── Discovery/       # Discovery screen components
│   └── Settings/        # Settings screen components
├── graphql/             # AppSync queries & mutations
├── helpers/             # Utility functions
├── hooks/               # Custom React hooks
├── navigation/          # Navigation configuration
├── screens/             # App screens
├── services/            # API service layers
├── stores/              # Zustand state stores
├── theme/               # Colors, typography, spacing
└── types/               # TypeScript type definitions
```

## Development Phases

- [x] Phase 1-3: Foundation, Auth, Core Components
- [x] Phase 4: Dashboard & History Screens
- [x] Phase 5: Add Entry Screen and Coffee Detail Screen
- [x] Phase 6: AWS Backend (DynamoDB/AppSync)
- [x] Phase 7: AI Integration (taste profiling & insights)
- [x] Phase 8: Discovery Screen with charts & AI insights
- [ ] Phase 9: Add images to coffee entries and use AI to prefil fields
- [ ] Phase 10: Testing and release to Play Store

## Scripts

| Script                      | Description                      |
| --------------------------- | -------------------------------- |
| `npm start`                 | Start Expo development server    |
| `npm run start:dev`         | Start with dev client            |
| `npm run build:dev:ios`     | Build iOS development client     |
| `npm run build:dev:android` | Build Android development client |
| `npm test`                  | Run tests                        |
| `npm run lint`              | Run ESLint                       |

## License

Private - All rights reserved
