import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store"
import ConfirmModal from "../../../components/ConfirmModal"
import { openModal, closeModal } from "../../../utils/common"
import {
  selectVisibleEmployees,
  selectEmployeeStatus,
  fetchEmployeesAsync,
  deleteEmployeeAsync,
} from "../employeeSlice"
import EmployeeForm from "./EmployeeForm"
import { VIEW_EMPLOYEEE_MODAL_ID } from "../../../utils/constants"

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
                <th className="hidden lg:flex">Department</th>
                <th>Role</th>
                <th className="hidden lg:flex">Hire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <th>{employee.id}</th>
                  <td>{employee.name}</td>
                  <td className="hidden lg:flex">{employee.department}</td>
                  <td>{employee.role}</td>
                  <td className="hidden lg:flex">{employee.hireDate}</td>
                  <td>
                    <button
                      onClick={() =>
                        openModal(`${VIEW_EMPLOYEEE_MODAL_ID}-${employee.id}`)
                      }
                      className="btn btn-ghost"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openModal(`edit-${employee.id}`)}
                      className="btn btn-ghost "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openModal(`delete-${employee.id}`)}
                      className="btn btn-ghost text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                  <EmployeeForm
                    key={`view-employee-form-${employee.id}`}
                    modalId={`${VIEW_EMPLOYEEE_MODAL_ID}-${employee.id}`}
                    defaultState={employee}
                  />
                  <EmployeeForm
                    key={`edit-employee-form-${employee.id}`}
                    modalId={`edit-${employee.id}`}
                    defaultState={employee}
                  />
                  <ConfirmModal
                    key={`confirm-delete-${employee.id}`}
                    modalId={`delete-${employee.id}`}
                    onSuccess={() => dispatch(deleteEmployeeAsync(employee.id))}
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
