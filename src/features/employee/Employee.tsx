import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchEmployeesAsync,
  addEmployeeAsync,
  editEmployeeAsync,
  deleteEmployeeAsync,
  selectEmployeeStatus,
} from "./employeeSlice"
import type { AppDispatch } from "../../app/store"
import { Employee } from "./employeeAPI"
import NavigationBar from "./components/navigationBar"
import EmployeeList from "./components/employeeList"
import FilterButton from "./components/filter"

const Employees = () => {
  // const handleAddEmployee = () => {
  //   dispatch(
  //     addEmployeeAsync({
  //       id: Date.now(),
  //       name: "New Employee",
  //       role: "New Role",
  //       department: "New Dept",
  //       hireDate: "2023-01-01",
  //       details: "New details",
  //     }),
  //   )
  // }

  // const handleEditEmployee = (employee: Employee) => {
  //   dispatch(editEmployeeAsync({ ...employee, name: "Updated Name" }))
  // }

  // const handleDeleteEmployee = (id: number) => {
  //   dispatch(deleteEmployeeAsync(id))
  // }

  return (
    <div>
      <NavigationBar />
      <EmployeeList />
      {/* <button onClick={handleAddEmployee}>Add Employee</button> */}
    </div>
  )
}

export default Employees
