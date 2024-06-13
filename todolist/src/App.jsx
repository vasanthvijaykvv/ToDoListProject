import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { DataProvider } from "./Components/DataProvider/DataProvider";
import Todo from "./Components/Todo";
function App() {


  return (
    <>
     <DataProvider>
     <CssBaseline />
     <Todo/>
     </DataProvider>
    </>
  )
}

export default App
