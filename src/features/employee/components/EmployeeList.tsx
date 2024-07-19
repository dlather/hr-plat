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
import ViewModal from "../../../components/ViewModal"

function EmployeeList() {
  const dispatch = useDispatch<AppDispatch>()
  const employees = useSelector(selectVisibleEmployees)
  const status = useSelector(selectEmployeeStatus)

  useEffect(() => {
    dispatch(fetchEmployeesAsync({}))
  }, [dispatch])

  if (status === "failed")
    return (
      <div className="flex h-screen justify-center items-center w-full">
        <span className="Failed Loading Employee"></span>
      </div>
    )

  return (
    <div className="flex-col ">
      <div className="flex justify-center items-center mt-6">
        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="table-row md:hidden">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Department</th>
                </tr>
                <tr className="hidden md:table-row">
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
                  <>
                    <tr
                      className="table-row md:hidden"
                      key={`r1-${employee.id}`}
                    >
                      <td className="flex-col justify-start">
                        <p>{employee.id}</p>
                        <button
                          onClick={() =>
                            openModal(
                              `${VIEW_EMPLOYEEE_MODAL_ID}-${employee.id}`,
                            )
                          }
                          className="btn btn-ghost px-0 btn-sm pt-2"
                        >
                          Details
                        </button>
                      </td>
                      <td className="flex-col justify-start">
                        <p>{employee.name}</p>
                        <button
                          onClick={() => openModal(`edit-${employee.id}`)}
                          className="btn btn-ghost px-0 btn-sm pt-2"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="flex-col justify-start">
                        <p>{employee.department}</p>
                        <button
                          onClick={() => openModal(`delete-${employee.id}`)}
                          className="btn btn-ghost px-0 btn-sm pt-2 text-red-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr className="hidden md:table-row" key={employee.id}>
                      <th>{employee.id}</th>
                      <td>{employee.name}</td>
                      <td className="hidden lg:table-cell">
                        {employee.department}
                      </td>
                      <td>{employee.role}</td>
                      <td className="hidden lg:table-cell">
                        {employee.hireDate}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              `${VIEW_EMPLOYEEE_MODAL_ID}-${employee.id}`,
                            )
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
                    </tr>
                    <ViewModal
                      modalId={`view-employee-form-${employee.id}`}
                      title={`Employee Details: ${employee.name}`}
                      bodyComponent={
                        <div className="space-y-2">
                          <div>
                            <strong>ID:</strong> {employee.id}
                          </div>
                          <div>
                            <strong>Name:</strong> {employee.name}
                          </div>
                          <div>
                            <strong>Role:</strong> {employee.role}
                          </div>
                          <div>
                            <strong>Department:</strong> {employee.department}
                          </div>
                          <div>
                            <strong>Hire Date:</strong>{" "}
                            {new Date(employee.hireDate).toLocaleDateString()}
                          </div>
                          {employee.details && (
                            <div>
                              <strong>Details:</strong> {employee.details}
                            </div>
                          )}
                        </div>
                      }
                      onClose={() =>
                        closeModal(`view-employee-form-${employee.id}`)
                      }
                    />
                    {/* <EmployeeForm
                    key={`view-employee-form-${employee.id}`}
                    modalId={`${VIEW_EMPLOYEEE_MODAL_ID}-${employee.id}`}
                    defaultState={employee}
                  /> */}
                    <EmployeeForm
                      key={`edit-employee-form-${employee.id}`}
                      modalId={`edit-${employee.id}`}
                      defaultState={employee}
                    />
                    <ConfirmModal
                      key={`confirm-delete-${employee.id}`}
                      modalId={`delete-${employee.id}`}
                      onSuccess={() =>
                        dispatch(deleteEmployeeAsync(employee.id))
                      }
                      title={"Are you sure ?"}
                      onCancel={() => closeModal(`delete-${employee.id}`)}
                      description="This action will delete the employee"
                    />
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : status !== "loading" ? (
          <div className="flex my-20 justify-center items-center">
            No Employee found
          </div>
        ) : null}
      </div>
      {status === "loading" ? (
        <div
          className={`flex justify-center items-center w-full ${employees.length === 0 ? "h-screen" : "mt-4"}`}
        >
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : null}
    </div>
  )
}

export default EmployeeList
