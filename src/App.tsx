import { Counter } from "./features/counter/Counter"
import Employees from "./features/employee/Employee"
import { Quotes } from "./features/quotes/Quotes"

const App = () => {
  return (
    <div className="App">
      <Employees />
      {/* <Counter />
      <Quotes /> */}
    </div>
  )
}

export default App
