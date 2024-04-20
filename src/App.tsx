import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyles from "./style/globalStyle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
    </QueryClientProvider>
  );
}

export default App;
