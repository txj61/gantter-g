import { useState, useEffect } from 'react'
import './index.css'

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
    <select className="g-select" defaultValue={defaultValue} value={selectedValue} onChange={(event) => {
      setSelectedValue(event.target.value)
      onChange && onChange(options.find(item => item.value === event.target.value))
    }}>
      {
        options.map(item => (
          <option value={item.value} key={item.value}>{item.label}</option>
        ))
      }
    </select>
  )
}
