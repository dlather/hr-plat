import { NAME_ASC, NAME_DESC, HIRE_ASC, HIRE_DESC } from "../../utils/constants"
import { Employee, FetchEmployeesParams, NewEmployee } from "./types"

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    department: "Engineering",
    hireDate: "2020-01-15",
    details: "Experienced in JavaScript and React.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Manager",
    department: "Product",
    hireDate: "2019-03-23",
    details: "Leads the product team with a focus on user-centric design.",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "UX Designer",
    department: "Design",
    hireDate: "2021-05-11",
    details: "Specializes in creating intuitive user interfaces.",
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Data Scientist",
    department: "Data",
    hireDate: "2018-07-30",
    details: "Expert in data analysis and machine learning.",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "DevOps Engineer",
    department: "Engineering",
    hireDate: "2017-11-18",
    details: "Skilled in continuous integration and deployment.",
  },
  {
    id: 6,
    name: "Sarah Lee",
    role: "Marketing Specialist",
    department: "Marketing",
    hireDate: "2019-08-09",
    details: "Expert in digital marketing and SEO.",
  },
  {
    id: 7,
    name: "Paul Martinez",
    role: "Financial Analyst",
    department: "Finance",
    hireDate: "2016-12-05",
    details: "Experienced in financial planning and analysis.",
  },
  {
    id: 8,
    name: "Laura Garcia",
    role: "Human Resources Manager",
    department: "HR",
    hireDate: "2018-03-14",
    details: "Specializes in employee relations and recruitment.",
  },
  {
    id: 9,
    name: "Robert Johnson",
    role: "Technical Writer",
    department: "Content",
    hireDate: "2020-09-25",
    details: "Experienced in creating technical documentation.",
  },
  {
    id: 10,
    name: "Maria Anderson",
    role: "QA Engineer",
    department: "Quality Assurance",
    hireDate: "2021-04-20",
    details: "Skilled in software testing and quality assurance.",
  },
  {
    id: 11,
    name: "James Moore",
    role: "Project Manager",
    department: "Project Management",
    hireDate: "2015-07-10",
    details: "Experienced in managing software development projects.",
  },
  {
    id: 12,
    name: "Patricia Clark",
    role: "Customer Support Specialist",
    department: "Support",
    hireDate: "2019-06-17",
    details: "Expert in customer service and support.",
  },
  {
    id: 13,
    name: "Michael Harris",
    role: "Backend Developer",
    department: "Engineering",
    hireDate: "2020-11-08",
    details: "Specializes in server-side development and databases.",
  },
  {
    id: 14,
    name: "Linda Young",
    role: "Graphic Designer",
    department: "Design",
    hireDate: "2018-02-19",
    details: "Skilled in graphic design and visual communication.",
  },
  {
    id: 15,
    name: "Kevin Martinez",
    role: "Network Administrator",
    department: "IT",
    hireDate: "2017-05-24",
    details: "Experienced in managing network infrastructure.",
  },
  {
    id: 16,
    name: "Jessica White",
    role: "Content Strategist",
    department: "Content",
    hireDate: "2016-09-13",
    details: "Specializes in content creation and strategy.",
  },
  {
    id: 17,
    name: "Thomas Walker",
    role: "Security Analyst",
    department: "Security",
    hireDate: "2018-12-01",
    details: "Expert in cybersecurity and threat analysis.",
  },
  {
    id: 18,
    name: "Elizabeth Hall",
    role: "Data Analyst",
    department: "Data",
    hireDate: "2019-10-04",
    details: "Experienced in data analysis and visualization.",
  },
  {
    id: 19,
    name: "Christopher Allen",
    role: "Full Stack Developer",
    department: "Engineering",
    hireDate: "2020-07-29",
    details: "Skilled in both frontend and backend development.",
  },
  {
    id: 20,
    name: "Barbara Young",
    role: "Office Manager",
    department: "Administration",
    hireDate: "2015-11-15",
    details: "Experienced in office management and administration.",
  },
]

export const fetchEmployees = async (
  params: FetchEmployeesParams = { departmentType: null, sortCriteria: null },
): Promise<Employee[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredEmployees = mockEmployees
      if (params.departmentType) {
        filteredEmployees = filteredEmployees.filter(
          emp => emp.department === params.departmentType,
        )
      }

      if (params.sortCriteria) {
        filteredEmployees = filteredEmployees.sort((a, b) => {
          switch (params.sortCriteria) {
            case NAME_ASC:
              return a.name.localeCompare(b.name)
            case NAME_DESC:
              return b.name.localeCompare(a.name)
            case HIRE_ASC:
              return (
                new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime()
              )
            case HIRE_DESC:
              return (
                new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime()
              )
            default:
              return 0
          }
        })
      }

      resolve(filteredEmployees)
    }, 500)
  })
}

export const addEmployee = async (employee: NewEmployee): Promise<Employee> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newId = mockEmployees.length
        ? Math.max(...mockEmployees.map(e => e.id)) + 1
        : 1
      const newEmployee: Employee = { ...employee, id: newId }
      mockEmployees.push(newEmployee)
      resolve(newEmployee)
    }, 500)
  })
}

export const editEmployee = async (
  updatedEmployee: Employee,
): Promise<Employee> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockEmployees.findIndex(e => e.id === updatedEmployee.id)
      if (index !== -1) {
        mockEmployees[index] = updatedEmployee
      }
      resolve(updatedEmployee)
    }, 500)
  })
}

export const deleteEmployee = async (id: number): Promise<number> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = mockEmployees.findIndex(e => e.id === id)
      if (index !== -1) {
        mockEmployees.splice(index, 1)
      }
      resolve(id)
    }, 500)
  })
}
