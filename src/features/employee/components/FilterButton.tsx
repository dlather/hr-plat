import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../../app/store"
import {
  selectVisibleEmployees,
  filterEmployees,
  selectDepartmentType,
} from "../employeeSlice"
import OptionsButton from "../../../components/OptionsButton"

const FilterButton = () => {
  const departmentTypeState = useSelector(selectDepartmentType)
  const dispatch = useDispatch<AppDispatch>()
  const employees = useSelector(selectVisibleEmployees)
  const departments = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department)))
  }, [employees])

  const applyHandler = (departmentType: string | null) => {
    dispatch(filterEmployees({ type: departmentType }))
  }

  return (
    <OptionsButton
      options={[
        { label: "All Departments", value: null },
        ...departments.map(department => ({
          label: department,
          value: department,
        })),
      ]}
      defaultOption={departmentTypeState}
      applyHandler={applyHandler}
      title={"Filter"}
    />
  )
}

export default FilterButton
