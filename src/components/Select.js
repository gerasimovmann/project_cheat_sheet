import React, { useState } from 'react'
import styles from './Select.module.scss'
import { IoIosArrowDown } from 'react-icons/io'

const CustomSelect = ({ options, onOptionSelect, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState()

  const toggleOptions = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    onOptionSelect(option)
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <div className={styles.customSelectContainer}>
      <div className={styles.selectedOption} onClick={toggleOptions}>
        <span>{selectedOption ? selectedOption.label : children}</span>
        <IoIosArrowDown className={isOpen ? styles.openSvg : ''} />
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          <li onClick={() => handleOptionClick('')}>{children}</li>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
