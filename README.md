# Bookings App

A high-performance, theme-aware property booking app built with Expo, TypeScript, Expo Router, NativeWind, React Query, Zustand, and a JSON-server backend.

---

## 🚀 Features

- **Home, Bookings, and Profile tabs** with file-based routing (Expo Router)
- **Property details** with image carousel, map, features, and calendar picker
- **Booking functionality** with robust state management and error handling
- **Theming, and persistent user state**
- **Performance optimizations**: memoization, lazy loading, image caching, deduped API calls, and more
- **Strongly typed API layer** with React Query and TypeScript
- **Hermes enabled for Android for faster JS execution**

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone git@github.com:premhowli/bookings-app.git
cd bookings-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the JSON-server backend

```bash
npx json-server --watch db.json --port 3000
```
- The backend runs at `http://localhost:3000` (update `API_URL` in `services/api.ts` if needed for your emulator/device).

### 4. Start the Expo app

```bash
npx expo start
```

- Use the QR code to open in Expo Go, or press `a` for Android emulator, `i` for iOS simulator.

---

## 🖥️ Running on Emulator

- **Android:**  
  Install [Android Studio](https://developer.android.com/studio), open an emulator, then run:
  ```bash
  npm run android
  ```
- **iOS:**  
  Install Xcode, open a simulator, then run:
  ```bash
  npm run ios
  ```

---

## 🧑‍💻 Implementation Details

- **Expo Router** for file-based navigation and lazy loading of screens
- **React Query** for API fetching, caching, deduplication, and error handling
- **Zustand** for global state management
- **NativeWind** for Tailwind-style utility classes in React Native
- **expo-image** for fast, cached image loading everywhere
- **Hermes** enabled for Android for improved JS performance
- **Optimized FlatList** and memoized components for smooth scrolling
- **All API calls are strongly typed and deduplicated**
- **Booking cards** show property details, and property data is fetched once and mapped in memory for efficiency
- **Calendar and map components** are memoized and only re-render when necessary

---

## 📝 Notes

- **Fuzzy search** is not implemented as part of the demo but will enhance the user experience a lot.
- **Lazy loading** is handled automatically by Expo Router for screens; we can use `React.lazy`/`Suspense` for heavy sub-components if needed in future.
- **Login** is handled statically here, and basically just storing the api data in store to provide access to the app.
- **Booking Confirmation** all bookings are confirmed booking in the app.
- **List optimizations** are useless at this moment as the data is too short but kept to handle once it scales.

---

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React Query](https://tanstack.com/query/latest)
- [NativeWind](https://www.nativewind.dev/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

## 🏁 Get Started

1. Start the backend:  
   `npx json-server --watch db.json --port 3000`
2. Start the app:  
   `npx expo start`
3. Open in emulator or Expo Go and enjoy!
