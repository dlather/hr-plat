import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
  Employee,
  FetchEmployeesParams,
  NewEmployee,
} from "./employeeAPI"

// Sorting constants
export const NAME_ASC = "nameAsc"
export const NAME_DESC = "nameDesc"
export const HIRE_ASC = "hireAsc"
export const HIRE_DESC = "hireDesc"

export type SortCriteria =
  | typeof NAME_ASC
  | typeof NAME_DESC
  | typeof HIRE_ASC
  | typeof HIRE_DESC
  | null

// TODO:
export const SORT_MAP = {
  "Name (A-Z)": NAME_ASC,
  "Name (Z-A)": NAME_DESC,
  "Hire (Recent)": HIRE_ASC,
  "Hire (Oldest)": HIRE_DESC,
}

export interface EmployeeSliceState {
  allEmployees: { [id: number]: Employee }
  visibleEmployeeIds: number[]
  departmentType: string | null
  sortCriteria: SortCriteria
  searchQuery: string
  status: "idle" | "loading" | "failed"
}

const initialState: EmployeeSliceState = {
  allEmployees: {},
  visibleEmployeeIds: [],
  departmentType: null,
  sortCriteria: NAME_ASC,
  searchQuery: "",
  status: "idle",
}

// Async thunks
export const fetchEmployeesAsync = createAsyncThunk(
  "employees/fetchEmployees",
  async (
    params: FetchEmployeesParams = { departmentType: null, sortCriteria: null },
  ) => {
    const response = await fetchEmployees(params)
    return response
  },
)

export const addEmployeeAsync = createAsyncThunk(
  "employees/addEmployee",
  async (employee: NewEmployee) => {
    const response = await addEmployee(employee)
    return response
  },
)

export const editEmployeeAsync = createAsyncThunk(
  "employees/editEmployee",
  async (employee: Employee) => {
    const response = await editEmployee(employee)
    return response
  },
)

export const deleteEmployeeAsync = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number) => {
    const response = await deleteEmployee(id)
    return response
  },
)

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.allEmployees = action.payload.reduce(
        (map, employee) => {
          map[employee.id] = employee
          return map
        },
        {} as { [id: number]: Employee },
      )
      state.visibleEmployeeIds = action.payload.map(employee => employee.id)
      state.visibleEmployeeIds = applyFilterAndSort(state)
    },
    filterEmployees(
      state,
      action: PayloadAction<{
        type: "role" | "department"
        value: string | null
      }>,
    ) {
      const { type, value } = action.payload
      state.departmentType = type === "department" ? value : null
      state.visibleEmployeeIds = applyFilterAndSort(state)
    },
    sortEmployees(state, action: PayloadAction<SortCriteria>) {
      state.sortCriteria = action.payload
      state.visibleEmployeeIds = applyFilterAndSort(state)
    },
    searchEmployees(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload

      // Apply search, filter, and sort
      state.visibleEmployeeIds = applyFilterAndSort(state)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployeesAsync.pending, state => {
        state.status = "loading"
      })
      .addCase(
        fetchEmployeesAsync.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.status = "idle"
          state.allEmployees = action.payload.reduce(
            (map, employee) => {
              map[employee.id] = employee
              return map
            },
            {} as { [id: number]: Employee },
          )
          state.visibleEmployeeIds = applyFilterAndSort(state)
        },
      )
      .addCase(fetchEmployeesAsync.rejected, state => {
        state.status = "failed"
      })
      .addCase(
        addEmployeeAsync.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.allEmployees[action.payload.id] = action.payload
          state.visibleEmployeeIds = applyFilterAndSort(state)
        },
      )
      .addCase(
        editEmployeeAsync.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          if (state.allEmployees[action.payload.id]) {
            state.allEmployees[action.payload.id] = action.payload
            state.visibleEmployeeIds = applyFilterAndSort(state)
          }
        },
      )
      .addCase(
        deleteEmployeeAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          delete state.allEmployees[action.payload]
          state.visibleEmployeeIds = applyFilterAndSort(state)
        },
      )
  },
})

// TODO: break + util
const applyFilterAndSort = (state: EmployeeSliceState): number[] => {
  let filteredIds = Object.keys(state.allEmployees).map(Number)

  // Apply filtering
  if (state.departmentType) {
    filteredIds = filteredIds.filter(
      id => state.allEmployees[id].department === state.departmentType,
    )
  }

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filteredIds = filteredIds.filter(id => {
      const employee = state.allEmployees[id]
      return (
        employee.id.toString().includes(query) ||
        employee.name.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      )
    })
  }

  // Apply sorting
  if (state.sortCriteria) {
    filteredIds.sort((a, b) => {
      const empA = state.allEmployees[a]
      const empB = state.allEmployees[b]
      switch (state.sortCriteria) {
        case NAME_ASC:
          return empA.name.localeCompare(empB.name)
        case NAME_DESC:
          return empB.name.localeCompare(empA.name)
        case HIRE_ASC:
          return (
            new Date(empA.hireDate).getTime() -
            new Date(empB.hireDate).getTime()
          )
        case HIRE_DESC:
          return (
            new Date(empB.hireDate).getTime() -
            new Date(empA.hireDate).getTime()
          )
        default:
          return 0
      }
    })
  }

  return filteredIds
}

// Selectors
export const { setEmployees, filterEmployees, sortEmployees, searchEmployees } =
  employeeSlice.actions
export const selectAllEmployees = (state: { employees: EmployeeSliceState }) =>
  Object.values(state.employees.allEmployees)

export const selectVisibleEmployees = (state: {
  employees: EmployeeSliceState
}) =>
  state.employees.visibleEmployeeIds.map(id => state.employees.allEmployees[id])
export const selectEmployeeStatus = (state: {
  employees: EmployeeSliceState
}) => state.employees.status
