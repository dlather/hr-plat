import { openModal } from "../../../../utils/common"
import AddEmployeeForm from "../addEmployeeForm"
import FilterButton from "../filter"
import SearchBar from "../searchBar"
import SortButton from "../sortBy"

function NavigationBar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Zippling</a>
        </div>
        <div className="navbar-end">
          <button
            onClick={() => openModal("add-employee-form")}
            className="btn btn-primary"
          >
            Add Employee
          </button>
          <AddEmployeeForm />
        </div>
      </div>
      <div className="navbar bg-base-100 hidden md:flex">
        <div className="navbar-start ml-4">
          <SearchBar />
        </div>
        <div className="navbar-end ">
          <FilterButton />
          <SortButton />
        </div>
      </div>
      <div className="flex-col px-4 justify-center md:hidden">
        <SearchBar />
        <div className="flex">
          <FilterButton />
          <SortButton />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar
