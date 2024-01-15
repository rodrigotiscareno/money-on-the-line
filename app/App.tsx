import React from "react";
import "./services/firebase";
import RootNavigation from "./RootNavigation";
import { ThemeProvider } from "react-native-elements";

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
