interface SelectProps {
  className?: string
  emptyOptionLabel?: string
  label: string
  renderOptions: () => React.ReactNode,
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select({
  className,
  label,
  emptyOptionLabel,
  renderOptions,
  onChange
}: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor="components-select--default">{label}</label>
      <select
        className="ds-select"
        id="components-select--default"
        onChange={onChange}
      >
        <option value="">{emptyOptionLabel}</option>
        {renderOptions()}
      </select>
    </div>
  )
}

export default Select