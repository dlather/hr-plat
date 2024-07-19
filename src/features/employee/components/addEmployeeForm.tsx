import { useForm, SubmitHandler } from "react-hook-form"
import { Employee, NewEmployee } from "../employeeAPI"
import { useDispatch } from "react-redux"
import { addEmployeeAsync } from "../employeeSlice"
import { closeModal } from "../../../utils/common"

type Inputs = Omit<Employee, "id">

export default function AddEmployeeForm() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  // Define the submit handler
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
    dispatch(addEmployeeAsync(data) as any)
    closeModal("add-employee-form")
    // Here you would typically dispatch an action to add the employee
  }

  return (
    <dialog
      id="add-employee-form"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          {/* Name Input */}
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
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
              className="grow"
              placeholder="Details about the employee"
              {...register("details")}
            />
          </label>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </form>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
