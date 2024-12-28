# ApeThisPumpFun

ApeThisPumpFun is a fun web application that provides real-time information about pump.fun tokens. Its modular structure, use of modern web technologies, and focus on user experience make it a solid foundation for further development and expansion in the crypto information space.

![Ape This](https://github.com/user-attachments/assets/89ae04cc-6e03-4ede-8a4d-d2836a54c120)

## 1. Overview

ApeThisPumpFun is a web application built with Next.js that provides real-time information about cryptocurrency tokens on the pump.fun platform. The application offers various features such as current metas, meta search, a token ticker, and live coin information.

### 1.1 Goals

- Provide users with up-to-date information on cryptocurrency tokens
- Offer an intuitive and responsive user interface
- Implement real-time data fetching and display
- Showcase various token metrics and allow for easy exploration of tokens


### 1.2 Key Features

- Token Ticker: Displays latest token information in a horizontal scrolling banner
- Meta Search: Allows users to search for specific metas with pagination
- Current Metas: Shows the current top metas
- Coins For You: Displays a curated list of coins for the user
- Currently Live Coins: Shows coins that are currently active on the platform


## 2. Architecture

The application is built using Next.js, a React framework that enables server-side rendering and generates static websites. It follows the App Router structure introduced in Next.js 13.

### 2.1 Project Structure

```plaintext
/app
  /api
    /coin
      /[mint]
        route.ts
    /coins-for-you
      route.ts
    /currently-live-coins
      route.ts
    /latest-tokens
      route.ts
    /search-metas
      route.ts
  /components
    CoinsForYou.tsx
    CoinPopup.tsx
    CurrentlyLiveCoins.tsx
    CurrentMetas.tsx
    MetaSearch.tsx
    TokenTicker.tsx
  globals.css
  layout.tsx
  page.tsx
  types.ts
```

### 2.2 Key Technologies

- React: Frontend library for building user interfaces
- Next.js: React framework for production-grade applications
- Tailwind CSS: Utility-first CSS framework for styling
- SWR: React hooks library for data fetching


## 3. Components

### 3.1 TokenTicker

Located in `app/components/TokenTicker.tsx`, this component displays a horizontal scrolling banner of the latest tokens.

Key features:

- Fetches data every 5 minutes
- Implements error handling and loading states
- Uses CSS animations for smooth scrolling effect


### 3.2 MetaSearch

Located in `app/components/MetaSearch.tsx`, this component allows users to search for metas.

Key features:

- Implements pagination
- Allows toggling of NSFW content
- Displays search results in a table format
- Includes a popup for detailed coin information


### 3.3 CurrentMetas

Located in `app/components/CurrentMetas.tsx`, this component displays the current top metas.

Key features:

- Server-side rendered for improved performance
- Displays metas in a table format with rank, name, and score


### 3.4 CoinsForYou

Located in `app/components/CoinsForYou.tsx`, this component shows a curated list of coins.

Key features:

- Implements a vertical scrolling effect
- Fetches new data every 10 seconds
- Displays coin image, symbol, name, and market cap


### 3.5 CurrentlyLiveCoins

Located in `app/components/CurrentlyLiveCoins.tsx`, this component displays currently active coins.

Key features:

- Similar to CoinsForYou, but focuses on live coins
- Implements error handling and displays error messages to the user


## 4. API Routes

The application uses several API routes to fetch data from the pump.fun API. These routes are located in the `app/api` directory.

### 4.1 /api/coin/[mint]

Fetches detailed information about a specific coin.

### 4.2 /api/coins-for-you

Fetches a curated list of coins for the user.

### 4.3 /api/currently-live-coins

Fetches the list of currently active coins.

### 4.4 /api/latest-tokens

Fetches the latest tokens for the TokenTicker component.

### 4.5 /api/search-metas

Handles the meta search functionality, including pagination and NSFW filtering.

## 5. Styling

The application uses Tailwind CSS for styling, which is configured in `app/globals.css`. Custom animations for the ticker and marquee effects are also defined here.

Key styling features:

- Responsive design that adapts to different screen sizes
- Dark theme with green accents for a crypto-themed look
- Custom animations for scrolling effects


## 6. Main Page Layout

The main page layout is defined in `app/page.tsx`. It includes all the main components and structures the overall layout of the application.

Key layout features:

- Responsive grid layout for different sections
- Suspense boundaries for improved loading experience


## 7. Error Handling and Performance

- Error boundaries are implemented in components to gracefully handle and display errors
- Server-side rendering is used where possible to improve initial load times
- SWR is used for efficient data fetching and caching


## 8. Future Considerations

- Implement user authentication for personalized experiences
- Add more interactive features like real-time price charts
- Optimize performance further, possibly by implementing virtualization for long lists
- Expand search capabilities and filtering options
- Implement a dark/light theme toggle


## 9. Conclusion

This documentation provides an overview of the application's structure, components, and key features. Developers working on this project should refer to this document for understanding the overall architecture and design decisions.
