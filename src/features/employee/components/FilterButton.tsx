import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store"
import {
  selectVisibleEmployees,
  filterEmployees,
  selectSortCriteria,
  selectDepartmentType,
} from "../employeeSlice"

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const departmentTypeState = useSelector(selectDepartmentType)
  const [departmentType, setdepartmentType] = useState<string | null>(
    departmentTypeState,
  )

  const dispatch = useDispatch<AppDispatch>()
  const employees = useSelector(selectVisibleEmployees)
  const departments = Array.from(new Set(employees.map(emp => emp.department)))

  const handleFilter = () => {
    dispatch(filterEmployees({ type: departmentType }))
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left mx-2 z-50">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter by Department
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 max-h-64 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="px-4 py-2 text-sm text-gray-700">Select</div>
            <button
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${null === departmentType ? "text-primary" : null}`}
              role="menuitem"
              onClick={() => setdepartmentType(null)}
            >
              All Departments
            </button>
            {departments.map(item => (
              <button
                key={item}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${item === departmentType ? "text-primary" : null}`}
                role="menuitem"
                onClick={() => setdepartmentType(item)}
              >
                {item}
              </button>
            ))}
            <div className="px-4 py-2">
              <button className="btn btn-primary w-full" onClick={handleFilter}>
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterButton
