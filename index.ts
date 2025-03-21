import { Alert } from "react-native";
import { ActionOptionsI } from "./types";

let defaultState: ActionOptionsI = {
  showAlertWhileError: false,
  customAlertComponent: null,
  AlertTitle: "",
  AlertMessage: "An unknown error occurred!!",
  AlertButtons: null,
  AlertDefaultButtonText: "Ok",
  AlertButtonOnPress: () => {},
};

const configureErrorHandle = (props: ActionOptionsI) => {
  defaultState = {
    ...defaultState,
    ...props,
  };
};

// Helper function to handle errors and optionally show an alert
const handleError = (error: unknown, options?: ActionOptionsI) => {
  const message = (() => {
    if (error instanceof Error) {
      return error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as any).data === "object" &&
      "message" in (error as { data: { message: string } }).data
    ) {
      const errorData = (error as { data: { message: string } }).data;
      return errorData.message;
    } else {
      return options?.AlertMessage || defaultState.AlertMessage;
    }
  })();

  if (
    typeof options?.showAlertWhileError == "boolean" ? options?.showAlertWhileError : defaultState.showAlertWhileError
  ) {
    if (options?.customAlertComponent) {
      options.customAlertComponent(message, options);
    } else {
      Alert.alert(
        options?.AlertTitle || "",
        options?.AlertMessage || message,
        options?.AlertButtons || [
          { text: defaultState.AlertDefaultButtonText, onPress: options?.AlertButtonOnPress || (() => {}) },
        ]
      );
    }
  }

  return message;
};

// Function for synchronous operations
const tryAction = <T>(
  interaction: () => T,
  options?: ActionOptionsI
): { done: boolean; data?: T; message?: string } => {
  try {
    const result = interaction();
    return { done: true, data: result };
  } catch (error: unknown) {
    const message = handleError(error, options);
    return { done: false, message };
  }
};

// Function for asynchronous operations
const tryActionAsync = async <T>(
  interaction: () => Promise<T>,
  options?: ActionOptionsI
): Promise<{ done: boolean; data?: T; message?: string }> => {
  try {
    const result = await interaction();
    return { done: true, data: result };
  } catch (error: unknown) {
    const message = handleError(error, options);
    return { done: false, message };
  }
};

export { configureErrorHandle, tryAction, tryActionAsync };
