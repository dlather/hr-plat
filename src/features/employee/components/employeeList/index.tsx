import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../../app/store"
import { Employee } from "../../employeeAPI"
import {
  selectVisibleEmployees,
  selectEmployeeStatus,
  fetchEmployeesAsync,
} from "../../employeeSlice"

function EmployeeList() {
  const dispatch = useDispatch<AppDispatch>()
  const employees = useSelector(selectVisibleEmployees)
  const status = useSelector(selectEmployeeStatus)

  useEffect(() => {
    dispatch(fetchEmployeesAsync({ departmentType: null, sortCriteria: null }))
  }, [dispatch])

  if (status === "loading") return <div>Loading...</div>
  if (status === "failed") return <div>Error loading employees</div>

  return (
    <div className="flex justify-center items-center">
      {employees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Hire Date</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr>
                  <th>{employee.id}</th>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.hireDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Employee found</div>
      )}
    </div>
  )
}

export default EmployeeList
