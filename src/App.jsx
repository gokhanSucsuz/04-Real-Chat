import { BrowserRouter } from "react-router-dom"
import "../src/chat.scss"
import { Register } from "./pages/Register"
function App() {

  return (
    <>
      <BrowserRouter>
        <Register />
      </BrowserRouter>

    </>
  )
}

export default App
