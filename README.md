# react-native-try-action

A lightweight utility for handling errors gracefully in React Native applications. This package provides a standardized way to execute synchronous and asynchronous functions safely with built-in error handling and optional alert messages.

## Features

- Safe execution of functions with automatic error handling.
- Customizable alert messages.
- Support for both synchronous and asynchronous operations.
- Configurable default error handling behavior.

## Installation

```sh
npm install react-native-try-action
```

OR

```sh
yarn add react-native-try-action
```

## Usage

### 1. Configure Error Handling (Optional)

```tsx
import { configureErrorHandle } from "react-native-try-action";

configureErrorHandle({
  showAlertWhileError: true,
  AlertTitle: "Error",
  AlertMessage: "Something went wrong!",
  AlertDefaultButtonText: "OK",
});
```

### 2. Handle Errors in Synchronous Functions

```tsx
import { tryAction } from "react-native-try-action";

const result = tryAction(() => {
  // Your function logic here
  return "Success!";
});

if (!result.done) {
  console.error("Error:", result.message);
} else {
  console.log("Result:", result.data);
}
```

### 3. Handle Errors in Asynchronous Functions

```tsx
import { tryActionAsync } from "react-native-try-action";

const fetchData = async () => {
  return await fetch("https://api.example.com/data").then((res) => res.json());
};

tryActionAsync(fetchData).then((result) => {
  if (!result.done) {
    console.error("Error:", result.message);
  } else {
    console.log("Data:", result.data);
  }
});
```

### 4. Custom Alert Component

```tsx
configureErrorHandle({
  customAlertComponent: (message) => {
    console.log("Custom Alert:", message);
  },
});
```

## API

### `configureErrorHandle(options: ActionOptionsI)`

Sets default error handling configurations.

| Parameter                | Type                                    | Description                                                      |
| ------------------------ | --------------------------------------- | ---------------------------------------------------------------- |
| `showAlertWhileError`    | `boolean`                               | Whether to show an alert on error. Default: `false`.             |
| `customAlertComponent`   | `(message?: string) => React.ReactNode` | Custom alert component. Default: `null`.                         |
| `AlertTitle`             | `string`                                | Alert title. Default: `""`.                                      |
| `AlertMessage`           | `string`                                | Default error message. Default: `"An unknown error occurred!!"`. |
| `AlertDefaultButtonText` | `string`                                | Default alert button text. Default: `"Ok"`.                      |
| `AlertButtonOnPress`     | `() => void`                            | Default button press action.                                     |

### `tryAction<T>(interaction: () => T, options?: ActionOptionsI)`

Executes a synchronous function safely.

| Parameter     | Type             | Description             |
| ------------- | ---------------- | ----------------------- |
| `interaction` | `() => T`        | Function to execute.    |
| `options`     | `ActionOptionsI` | Optional configuration. |

Returns: `{ done: boolean; data?: T; message?: string }`

### `tryActionAsync<T>(interaction: () => Promise<T>, options?: ActionOptionsI)`

Executes an asynchronous function safely.

| Parameter     | Type               | Description                |
| ------------- | ------------------ | -------------------------- |
| `interaction` | `() => Promise<T>` | Async function to execute. |
| `options`     | `ActionOptionsI`   | Optional configuration.    |

Returns: `Promise<{ done: boolean; data?: T; message?: string }>`

## License

MIT
