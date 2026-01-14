# BestBrew ☕

A modern coffee tracking app to log, rate, and discover your perfect coffee.
NOTE: This app is currently in development and is not yet available for download. AI has been used to assist with the development of this app.

## Tech Stack

- **Framework:** React Native with Expo (managed workflow)
- **Language:** TypeScript (strict mode)
- **State Management:** Zustand with AsyncStorage persistence
- **Caching:** Tanstack Query (coming soon) when data fetching is added
- **Navigation:** React Navigation (Native Stack + Bottom Tabs)
- **Authentication:** AWS Amplify v6 (Cognito User Pool + Google OAuth)
- **UI:** Custom component library with dark/light mode support
- **Icons:** @expo/vector-icons (MaterialIcons)
- **Lists:** @shopify/flash-list
- **Animations:** react-native-reanimated
- **Testing:** React Native Testing Library + MSW incoming when data fetching is added
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
├── components/
│   └── common/          # Reusable UI components
├── hooks/               # Custom React hooks
├── navigation/          # Navigation configuration
├── screens/             # App screens
├── stores/              # Zustand state stores
├── theme/               # Colors, typography, spacing
└── types/               # TypeScript type definitions
```

## Development Phases

- [x] Phase 1-3: Foundation, Auth, Core Components
- [x] Phase 4: Dashboard & History Screens
- [x] Phase 5: Add Entry Screen and Details Screen (UI)
- [ ] Phase 6: AWS Backend (DynamoDB/AppSync)
- [ ] Phase 6.5: Fix Google Sign In
- [ ] Phase 7: AI Integration (palate profiling & recommendations)
- [ ] Phase 8: Discovery & Recommendations UI
- [ ] Phase 9: Settings & Monetization

## Scripts

| Script                      | Description                      |
| --------------------------- | -------------------------------- |
| `npm start`                 | Start Expo development server    |
| `npm run start:dev`         | Start with dev client            |
| `npm run build:dev:ios`     | Build iOS development client     |
| `npm run build:dev:android` | Build Android development client |
| `npm test`                  | Run tests                        |
| `npm run lint`              | Run ESLint                       |

## Code Style

- No semicolons (Prettier configured)
- No code comments
- No barrel exports
- Use `@/` path aliases for imports
- Components: folder with `index.tsx` + `styles.ts`
- Tests sit alongside components

## License

Private - All rights reserved
