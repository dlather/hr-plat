import { openModal } from "../../../utils/common"
import { ADD_EMPLOYEEE_MODAL_ID } from "../../../utils/constants"
import EmployeeForm from "./EmployeeForm"
import FilterButton from "./FilterButton"
import SearchBar from "./SearchBar"
import SortButton from "./SortButton"

function NavigationBar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Zippling</a>
        </div>
        <div className="navbar-end mr-4">
          <button
            onClick={() => openModal(ADD_EMPLOYEEE_MODAL_ID)}
            className="btn btn-primary"
          >
            Add Employee
          </button>
          <EmployeeForm modalId={ADD_EMPLOYEEE_MODAL_ID} defaultState={null} />
        </div>
      </div>
      <div className="navbar bg-base-100 hidden md:flex">
        <div className="navbar-start ml-4">
          <SearchBar />
        </div>
        <div className="navbar-end mr-2">
          <FilterButton />
          <SortButton />
        </div>
      </div>
      <div className="flex-col px-4 justify-center md:hidden">
        <div className="mr-2">
          <SearchBar />
        </div>
        <div className="flex justify-end">
          <FilterButton />
          <SortButton />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
