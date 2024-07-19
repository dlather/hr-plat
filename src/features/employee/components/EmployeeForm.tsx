import { useForm, SubmitHandler } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addEmployeeAsync, editEmployeeAsync } from "../employeeSlice"
import { closeModal } from "../../../utils/common"
import { Employee, NewEmployee } from "../types"
import {
  ADD_EMPLOYEEE_MODAL_ID,
  VIEW_EMPLOYEEE_MODAL_ID,
} from "../../../utils/constants"

// modalId => ADD_EMPLOYEEE_MODAL_ID: used for adding employee
// modalId => VIEW_EMPLOYEEE_MODAL_ID: used for only viewing employee details
export default function EmployeeForm({
  modalId = ADD_EMPLOYEEE_MODAL_ID,
  defaultState,
}: {
  modalId: string
  defaultState: Employee | null
}) {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEmployee>({
    defaultValues: defaultState ?? {},
  })

  const onSubmit: SubmitHandler<NewEmployee> = data => {
    console.log(data)
    if (modalId !== ADD_EMPLOYEEE_MODAL_ID && defaultState && defaultState.id) {
      dispatch(editEmployeeAsync({ ...data, id: defaultState.id }) as any)
    }
    if (modalId === ADD_EMPLOYEEE_MODAL_ID) {
      dispatch(addEmployeeAsync(data) as any)
    }
    closeModal(modalId)
  }
  const isViewMode = modalId.includes(VIEW_EMPLOYEEE_MODAL_ID)

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h1 className="font-semibold text-lg mx-auto">Employee Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          {/* Name Input */}
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              disabled={isViewMode}
              type="text"
              className="grow"
              placeholder="Daisy"
              {...register("name", { required: "Name is required" })}
            />
          </label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Role Input */}
          <label className="input input-bordered flex items-center gap-2">
            Role
            <input
              disabled={isViewMode}
              type="text"
              className="grow"
              placeholder="Software Engineer"
              {...register("role", { required: "Role is required" })}
            />
          </label>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          {/* Department Input */}
          <label className="input input-bordered flex items-center gap-2">
            Department
            <input
              disabled={isViewMode}
              type="text"
              className="grow"
              placeholder="Engineering"
              {...register("department", {
                required: "Department is required",
              })}
            />
          </label>
          {errors.department && (
            <p className="text-red-500">{errors.department.message}</p>
          )}

          {/* Hire Date Input */}
          <label className="input input-bordered flex items-center gap-2">
            Hire Date
            <input
              disabled={isViewMode}
              type="date"
              className="grow"
              placeholder="2020-01-15"
              {...register("hireDate", { required: "Hire Date is required" })}
            />
          </label>
          {errors.hireDate && (
            <p className="text-red-500">{errors.hireDate.message}</p>
          )}

          {/* Details Input */}
          <label className="textarea textarea-bordered flex items-center gap-2">
            Details
            <textarea
              disabled={isViewMode}
              className="grow"
              placeholder="Details about the employee"
              {...register("details")}
            />
          </label>
          <div className="flex justify-center items-center gap-2">
            <button type="submit" className="btn btn-wide btn-primary">
              Confirm
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}
