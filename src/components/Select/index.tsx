import { useState, useEffect } from 'react'

interface IOption {
  value: string,
  label: string | number
}

interface ISelectProps{
  options: IOption[]
  defaultValue?: string
  onChange?: (event: IOption | undefined) => void
}

export default (props: ISelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>()
  const { options, defaultValue, onChange } = props

  useEffect(() => {
    setSelectedValue(defaultValue)
  }, [defaultValue])

  return (
    <select
      defaultValue={defaultValue}
      value={selectedValue}
      style={{
        padding: '4px',
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
        transition: 'all 0.3s',
        boxSizing: 'border-box',
        height: '30px'
      }}
      onChange={(event) => {
        setSelectedValue(event.target.value)
        onChange && onChange(options.find(item => item.value === event.target.value))
      }}
    >
      {
        options.map(item => (
          <option value={item.value} key={item.value}>{item.label}</option>
        ))
      }
    </select>
  )
}
