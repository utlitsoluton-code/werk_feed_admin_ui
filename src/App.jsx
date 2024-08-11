import { QueryClient, QueryClientProvider } from "react-query"
import AdminProvider from "./providers/AdminProvider"
import Routes from "./router/Routes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';

function App() {

  const client = new QueryClient();

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={client}>
          <ToastContainer />
          <AdminProvider>
            <Routes />
          </AdminProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default App
