import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../../app/store"
import { NAME_ASC, SORT_MAP } from "../../../utils/constants"
import { sortEmployees } from "../employeeSlice"
import { SortCriteria } from "../types"

const SortButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(NAME_ASC)
  const dispatch = useDispatch<AppDispatch>()

  const handleSort = () => {
    dispatch(sortEmployees(sortCriteria))
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left mx-2 z-50">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sort by
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 max-h-64 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 flex flex-col">
          <div
            className="py-1 flex-grow"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.entries(SORT_MAP).map(sortObj => {
              return (
                <button
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${sortCriteria === sortObj[1] ? "text-primary" : null} `}
                  role="menuitem"
                  onClick={() => setSortCriteria(sortObj[1] as SortCriteria)}
                >
                  {sortObj[0]}
                </button>
              )
            })}
          </div>
          <div className="px-4 py-2">
            <button className="btn btn-primary w-full" onClick={handleSort}>
              Apply Sort
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SortButton
