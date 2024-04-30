// Renders a line visualising the number of datasets as a percentage of the highest number of datasets.
function DatasetCountVisualisation({
  datasets,
  maxDatasets,
}: {
  datasets: number
  maxDatasets: number
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-8 bg-blue-700"
        style={{
          width: `${(datasets / maxDatasets) * 100}%`,
        }}
      />
      <div
        className="h-8 bg-blue-400"
        style={{
          width: `${((maxDatasets - datasets) / maxDatasets) * 100}%`,
        }}
      />
    </div>
  )
}

export interface IDepartmentProps {
  department: string
  description?: string
  datasets?: number
  maxDatasets?: number
}

function Department({
  department,
  description = "",
  datasets = 0,
  maxDatasets = 0,
}: IDepartmentProps) {
  return (
    <div className="flex flex-col gap-16 justify-between p-16 rounded-xl bg-blue-100 hover:bg-blue-300 min-h-192 cursor-pointer">
      <div className="ds-label-02-bold md:ds-label-01-bold break-words min-h-56">
        {department}
      </div>
      <div className="ds-label-03-reg">{description}</div>
      <div className="ds-label-03-reg">
        <span className="ds-label-03-bold">{datasets}</span>{" "}
        {datasets === 1 ? "Datensatz" : "Datensätze"}
      </div>
      <DatasetCountVisualisation
        datasets={datasets}
        maxDatasets={maxDatasets}
      />
    </div>
  )
}

export default Department
