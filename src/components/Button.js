import React from 'react'
import styles from './Button.module.scss'

function Button({ children, onClick, id, statePage }) {
  return (
    <button
      id={id}
      className={
        statePage === 'edit'
          ? `${styles.buttonEdit} ${styles.modeEdit}`
          : styles.buttonEdit
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
