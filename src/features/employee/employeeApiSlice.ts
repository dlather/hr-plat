// TODO:
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Employee {
  id: number
  name: string
  role: string
  department: string
  hireDate: string
  details: string
}

interface EmployeesApiResponse {
  employees: Employee[]
  total: number
  skip: number
  limit: number
}

export const employeesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  reducerPath: "employeesApi",
  tagTypes: ["Employees"],
  endpoints: build => ({
    getEmployees: build.query<EmployeesApiResponse, number>({
      query: (limit = 10) => `?limit=${limit}`,
      providesTags: (result, error, id) => [{ type: "Employees", id }],
    }),
    addEmployee: build.mutation<Employee, Partial<Employee>>({
      query: employee => ({
        url: "employees",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),
    editEmployee: build.mutation<Employee, Partial<Employee> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Employees", id }],
    }),
    deleteEmployee: build.mutation<{ success: boolean; id: number }, number>({
      query: id => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Employees", id }],
    }),
  }),
})

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApiSlice
