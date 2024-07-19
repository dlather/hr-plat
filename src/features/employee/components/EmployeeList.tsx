import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store"
import ConfirmModal from "../../../components/ConfirmModal"
import { openModal, closeModal } from "../../../utils/common"
import {
  selectVisibleEmployees,
  selectEmployeeStatus,
  fetchEmployeesAsync,
} from "../employeeSlice"
import EmployeeForm from "./EmployeeForm"

function EmployeeList() {
  const dispatch = useDispatch<AppDispatch>()
  const employees = useSelector(selectVisibleEmployees)
  const status = useSelector(selectEmployeeStatus)

  useEffect(() => {
    dispatch(fetchEmployeesAsync({}))
  }, [dispatch])

  if (status === "loading")
    return (
      <div className="flex h-screen justify-center items-center w-full">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )

  if (status === "failed")
    return (
      <div className="flex h-screen justify-center items-center w-full">
        <span className="Failed Loading Employee"></span>
      </div>
    )

  return (
    <div className="flex justify-center items-center">
      {employees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Hire Date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <th>{employee.id}</th>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>{employee.hireDate}</td>
                  <td>
                    <button
                      onClick={() => openModal(`edit-${employee.id}`)}
                      className="btn btn-ghost "
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(`delete-${employee.id}`)}
                      className="btn btn-ghost text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                  <EmployeeForm
                    key={`employee-form-${employee.id}`}
                    modalId={`edit-${employee.id}`}
                    defaultState={employee}
                  />
                  <ConfirmModal
                    key={`confirm-delete-${employee.id}`}
                    modalId={`delete-${employee.id}`}
                    onSuccess={() => console.log("delete")}
                    title={"Are you sure ?"}
                    onCancel={() => closeModal(`delete-${employee.id}`)}
                    description="This action will delete the employee"
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex my-20 justify-center items-center">
          No Employee found
        </div>
      )}
    </div>
  )
}

export default EmployeeList
