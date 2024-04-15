# Responsive Image Gallery with Swipe Gestures

You are tasked with creating a responsive image gallery component using React.js. The gallery should display a grid of
thumbnail images, and users should be able to swipe left or right on a touch-enabled device (or use drag-and-drop on
a desktop) to navigate between images.

The demo is available [here](https://demo.berdychowski.com/rig/).

## Technologies

-   **AXIOS**: A JavaScript library for performing HTTP requests, used to communicate with the FakeStoreAPI to retrieve data.
-   **UnsplashJS**: The official JavaScript client wrapper for the Unsplash API, enabling easy integration with JavaScript applications, including React.
-   **React-Swipeable**: Is a lightweight and highly customizable React component designed to add swipe functionalities to your React applications.

## Quick Start

Clone the repo and install the dependencies.

```bash
npm install
```

The `dev` command will start a dev server and watch for code changes in JS and CSS files. Hot reloading is enabled, so that any change will be visible in your browser as you type.

```bash
npm run dev
```

For production usage, run the `build` command and everything packed together into the `dist` directory.

```bash
npm run build
```

## TO DO!

-   [ ] Adding a transition effect for images in the zoomed view (isZoomed)
-   [ ] Setting a masonry view as an option for different photo heights
-   [ ] Adding thumbnails in the zoomed view (isZoomed)
