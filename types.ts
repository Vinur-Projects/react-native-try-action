import React from "react";

export interface AlertButtonI {
  text: string;
  onPress: () => void;
}

export interface ActionOptionsI {
  showAlertWhileError?: boolean;
  customAlertComponent?: ((message?: string, options?: ActionOptionsI) => React.ReactNode) | null;
  AlertTitle?: string;
  AlertMessage?: string;
  AlertButtons?: AlertButtonI[] | null;
  AlertDefaultButtonText?: string;
  AlertButtonOnPress?: () => void;
}
