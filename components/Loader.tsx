import React from "react"
import styles from "./components.module.css"

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <p className={styles.loaderText} data-testid="text-loader">
        Loading it is...
      </p>
      <span className={styles.loader} data-testid="span-loader"></span>
    </div>
  )
}

export default Loader
