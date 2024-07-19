import { useState } from "react"

interface Option {
  label: string
  value: string | null
}

interface OptionButtonProps {
  title: string
  defaultOption?: string | null
  options: Option[]
  applyHandler?: (option: string | null) => void
}

const OptionsButton: React.FC<OptionButtonProps> = ({
  title,
  defaultOption = null,
  options = [],
  applyHandler = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [option, setoption] = useState<string | null>(defaultOption)

  const handleoption = () => {
    applyHandler(option)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left mx-2 z-50">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} by
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 max-h-64 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map(item => (
              <button
                key={item.value}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${item.value === option ? "text-primary" : null}`}
                role="menuitem"
                onClick={() => setoption(item.value)}
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 py-2">
              <button className="btn btn-primary w-full" onClick={handleoption}>
                Apply {title}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OptionsButton
