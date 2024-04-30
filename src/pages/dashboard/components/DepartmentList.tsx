import Department from "./Department"

function DepartmentList({ departments }: { departments: any[] }) {
  // Calculate the highest number of datasets so we can render a visualisation
  // making it easier to compare the number of datasets between departments.
  const maxDatasets = Math.max(
    ...departments.map((department) => department.datasets),
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {departments.map((department, index) => (
        <Department key={index} {...department} maxDatasets={maxDatasets} />
      ))}
    </div>
  )
}

export default DepartmentList
