import Select from "../../../components/Select"
import { IDepartment } from "../../../types/department"

function DatasetsFilterSelect({
  onChange,
  departments,
}: {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  departments: IDepartment[]
}) {
  return (
    <Select
      label="Wähle eine Abteilung"
      emptyOptionLabel="Alle Abteilungen"
      renderOptions={() =>
        departments.map((department, index) => (
          <option key={index} value={department.department}>
            {department.department}
          </option>
        ))
      }
      onChange={onChange}
    />
  )
}

export default DatasetsFilterSelect
