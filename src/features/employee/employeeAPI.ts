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
  {
    id: 21,
    name: "Jane Smith",
    role: "Product Manager",
    department: "Product",
    hireDate: "2019-07-01",
    details: "Leads the product development team.",
  },
  {
    id: 22,
    name: "Emily Johnson",
    role: "UX Designer",
    department: "Design",
    hireDate: "2021-02-10",
    details: "Specializes in user interface and experience design.",
  },
  {
    id: 23,
    name: "Michael Brown",
    role: "Data Scientist",
    department: "Data",
    hireDate: "2020-11-05",
    details: "Expert in data analysis and machine learning.",
  },
  {
    id: 24,
    name: "Sarah Davis",
    role: "Marketing Specialist",
    department: "Marketing",
    hireDate: "2018-04-20",
    details: "Focuses on digital marketing strategies.",
  },
  {
    id: 25,
    name: "David Wilson",
    role: "Sales Manager",
    department: "Sales",
    hireDate: "2019-09-15",
    details: "Oversees the sales team and drives revenue.",
  },
  {
    id: 26,
    name: "Anna Martinez",
    role: "Customer Support",
    department: "Support",
    hireDate: "2021-03-12",
    details: "Provides customer support and handles inquiries.",
  },
  {
    id: 27,
    name: "Robert Garcia",
    role: "DevOps Engineer",
    department: "Engineering",
    hireDate: "2020-08-22",
    details: "Manages infrastructure and deployment pipelines.",
  },
  {
    id: 28,
    name: "Laura Lee",
    role: "HR Manager",
    department: "Human Resources",
    hireDate: "2017-06-30",
    details: "Handles recruitment and employee relations.",
  },
  {
    id: 29,
    name: "James Thompson",
    role: "Business Analyst",
    department: "Business",
    hireDate: "2021-01-19",
    details: "Analyzes business processes and data.",
  },
  {
    id: 30,
    name: "Linda Robinson",
    role: "Finance Manager",
    department: "Finance",
    hireDate: "2019-11-01",
    details: "Manages financial planning and analysis.",
  },
  {
    id: 31,
    name: "Charles Clark",
    role: "Network Administrator",
    department: "IT",
    hireDate: "2018-05-17",
    details: "Maintains network infrastructure and security.",
  },
  {
    id: 32,
    name: "Patricia Rodriguez",
    role: "Graphic Designer",
    department: "Design",
    hireDate: "2021-04-25",
    details: "Creates visual content for marketing campaigns.",
  },
  {
    id: 33,
    name: "Christopher Lewis",
    role: "Content Writer",
    department: "Marketing",
    hireDate: "2019-08-13",
    details: "Produces written content for blogs and social media.",
  },
  {
    id: 34,
    name: "Nancy Walker",
    role: "Operations Manager",
    department: "Operations",
    hireDate: "2020-12-10",
    details: "Oversees daily operations and logistics.",
  },
  {
    id: 35,
    name: "Karen Hall",
    role: "Project Coordinator",
    department: "Project Management",
    hireDate: "2018-03-27",
    details: "Coordinates project activities and timelines.",
  },
  {
    id: 36,
    name: "Brian Allen",
    role: "QA Engineer",
    department: "Quality Assurance",
    hireDate: "2021-05-16",
    details: "Tests and ensures the quality of software products.",
  },
  {
    id: 37,
    name: "Kevin Young",
    role: "Mobile Developer",
    department: "Engineering",
    hireDate: "2019-02-07",
    details: "Develops mobile applications for iOS and Android.",
  },
  {
    id: 38,
    name: "Donna King",
    role: "Legal Advisor",
    department: "Legal",
    hireDate: "2020-10-11",
    details: "Provides legal counsel and support.",
  },
  {
    id: 39,
    name: "Eric Wright",
    role: "Security Specialist",
    department: "Security",
    hireDate: "2018-01-15",
    details: "Ensures the security of company data and assets.",
  },
  {
    id: 40,
    name: "Jessica Scott",
    role: "Executive Assistant",
    department: "Administration",
    hireDate: "2021-06-05",
    details: "Assists the executive team with administrative tasks.",
  },
  {
    id: 41,
    name: "Thomas Harris",
    role: "Full Stack Developer",
    department: "Engineering",
    hireDate: "2021-01-22",
    details: "Specializes in both frontend and backend development.",
  },
  {
    id: 42,
    name: "Angela Martin",
    role: "SEO Specialist",
    department: "Marketing",
    hireDate: "2020-11-12",
    details: "Expert in search engine optimization strategies.",
  },
  {
    id: 43,
    name: "Oscar Carter",
    role: "Business Development Manager",
    department: "Sales",
    hireDate: "2019-08-29",
    details: "Focuses on expanding business opportunities and partnerships.",
  },
  {
    id: 44,
    name: "Mia Evans",
    role: "Software Architect",
    department: "Engineering",
    hireDate: "2021-03-08",
    details: "Designs and oversees the architecture of software solutions.",
  },
  {
    id: 45,
    name: "Liam Green",
    role: "Data Analyst",
    department: "Data",
    hireDate: "2020-05-23",
    details: "Analyzes data to provide actionable insights for the business.",
  },
  {
    id: 46,
    name: "Sophia Nelson",
    role: "Content Strategist",
    department: "Marketing",
    hireDate: "2018-09-18",
    details:
      "Develops and implements content strategies for various platforms.",
  },
  {
    id: 47,
    name: "Daniel Adams",
    role: "Front End Developer",
    department: "Engineering",
    hireDate: "2019-12-01",
    details: "Focuses on creating and maintaining user interfaces.",
  },
  {
    id: 48,
    name: "Isabella Clark",
    role: "Customer Success Manager",
    department: "Support",
    hireDate: "2021-07-21",
    details:
      "Ensures customers are satisfied and successfully using the product.",
  },
  {
    id: 49,
    name: "Matthew Turner",
    role: "Product Designer",
    department: "Design",
    hireDate: "2018-04-09",
    details: "Designs and improves product interfaces and user experiences.",
  },
  {
    id: 50,
    name: "Olivia Walker",
    role: "Operations Analyst",
    department: "Operations",
    hireDate: "2020-10-16",
    details: "Analyzes and improves operational processes and efficiency.",
  },
]

export const fetchEmployees = async (
  params: FetchEmployeesParams = {
    departmentType: null,
    sortCriteria: null,
    searchQuery: "",
  },
): Promise<Employee[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let filteredEmployees = mockEmployees
      if (params.departmentType) {
        filteredEmployees = filteredEmployees.filter(
          emp => emp.department === params.departmentType,
        )
      }

      if (params.searchQuery) {
        const query = params.searchQuery.toLowerCase()
        filteredEmployees = filteredEmployees.filter(employee => {
          return (
            employee.id.toString().includes(query) ||
            employee.name.toLowerCase().includes(query) ||
            employee.role.toLowerCase().includes(query) ||
            employee.department.toLowerCase().includes(query)
          )
        })
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
      const limitedEmployees = filteredEmployees.slice(0, 10)
      resolve(limitedEmployees)
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
