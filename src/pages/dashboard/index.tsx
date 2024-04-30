import React, { Suspense } from "react"
import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"

import ErrorFallback from "../../components/ErrorFallback"

import DepartmentList from "./components/DepartmentList"
import DepartmentFilterSelect from "./components/DepartmentFilterSelect"
import Loading from "../../components/Loading"

import { useDepartments } from "../../api/department"
import { IDepartment } from "../../types/department"

function DashboardContent() {
  // Fetch departments from the API.
  const { data: departments, isFetching, error, refetch } = useDepartments()

  const [departmentFilter, setDepartmentFilter] = React.useState("")
  const [filteredDepartments, setFilteredDepartments] = React.useState([])

  const totalDeparments = filteredDepartments?.length

  const handleChangeDepartmentFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDepartmentFilter(event.target.value)
  }

  // Apply the department filter.
  React.useEffect(() => {
    if (departmentFilter === "") {
      setFilteredDepartments(departments)
    } else {
      setFilteredDepartments(
        departments.filter(
          (department: IDepartment) =>
            department.department === departmentFilter,
        ),
      )
    }
  }, [departmentFilter, departments])

  if (isFetching) return <Loading />
  if (error) return <ErrorFallback error={error} resetErrorBoundary={refetch} />

  return (
    <div>
      <div className="mb-32">
        <DepartmentFilterSelect
          departments={departments}
          onChange={handleChangeDepartmentFilter}
        />
      </div>
      <div className="ds-label-02-bold mb-8">
        {totalDeparments} {totalDeparments === 1 ? "Abteilung" : "Abteilungen"}
      </div>
      <DepartmentList departments={filteredDepartments} />
    </div>
  )
}

function Dashboard() {
  return (
    <div className="container mx-auto p-16">
      <h1 className="ds-heading-03-reg sm:ds-heading-02-reg md:ds-heading-01-reg mb-32">
        Dashboard
      </h1>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>
              <DashboardContent />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  )
}

export default Dashboard
