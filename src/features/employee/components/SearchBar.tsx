import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import debouce from "lodash.debounce"
import { AppDispatch } from "../../../app/store"
import {
  fetchEmployeesAsync,
  searchEmployees,
  selectDepartmentType,
  selectSearchQuery,
} from "../employeeSlice"

// Add debounce when using search API
const SearchBar = () => {
  const searchQuery = useSelector(selectSearchQuery)
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState(searchQuery)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sValue = event.target.value
    setQuery(sValue)
    dispatch(searchEmployees(sValue))
    debouncedFetch(sValue)
  }

  const handleChange = (value: string) => {
    dispatch(fetchEmployeesAsync({ searchQuery: value }))
  }

  const debouncedFetch = useMemo(() => {
    return debouce(handleChange, 300)
  }, [])

  useEffect(() => {
    return () => {
      debouncedFetch.cancel()
    }
  }, [debouncedFetch])

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
