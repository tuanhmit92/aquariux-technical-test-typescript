import AppProvider from "./contexts/app-context";
import Home from "./pages/home/home";

import "./assets/styles/styles.scss";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
