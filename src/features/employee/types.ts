import { HIRE_ASC, HIRE_DESC, NAME_ASC, NAME_DESC } from "../../utils/constants"

export interface Employee {
  id: number
  name: string
  role: string
  department: string
  hireDate: string
  details: string
}

export type NewEmployee = Omit<Employee, "id">

export interface FetchEmployeesParams {
  departmentType?: string | null
  sortCriteria?: SortCriteria
  searchQuery?: string
}

export type SortCriteria =
  | typeof NAME_ASC
  | typeof NAME_DESC
  | typeof HIRE_ASC
  | typeof HIRE_DESC
  | null

export interface EmployeeSliceState {
  allEmployees: { [id: number]: Employee }
  visibleEmployeeIds: number[]
  departmentType: string | null
  sortCriteria: SortCriteria
  searchQuery: string
  status: "idle" | "loading" | "failed"
}
