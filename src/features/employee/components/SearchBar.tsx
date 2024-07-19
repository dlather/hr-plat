import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchEmployees } from "../employeeSlice"

// Add debounce when using search API
const SearchBar = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    dispatch(searchEmployees(event.target.value))
  }

  return (
    <div className="w-full my-2">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search employees"
        className="border border-gray-300 rounded p-2 w-full"
      />
    </div>
  )
}

export default SearchBar
