import { lazy } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { REACT_QUERY_CLIENT_CONFIG } from "./constants"

// Initialize the react-query client.
const queryClient = new QueryClient(REACT_QUERY_CLIENT_CONFIG)

// Lazy load the Dashboard component.
const Dashboard = lazy(() => import("./pages/dashboard"))

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Dashboard />
      </div>
    </QueryClientProvider>
  )
}

export default App
