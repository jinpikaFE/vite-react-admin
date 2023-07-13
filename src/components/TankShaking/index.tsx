import React from 'react'
import styles from './index.module.less'

const TankShaking = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.bottle}>
          <span className={styles.loadingText}>loading!</span>
          <div className={styles.water} />
        </div>
        <div className={styles.bottleBottom} />
      </div>
    </div>
  )
}

export default TankShaking
