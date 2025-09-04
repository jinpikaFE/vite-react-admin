import { Button, ButtonProps } from 'antd'
import React from 'react'
import styles from './index.module.less'

const BirdButton: React.FC<
  {
    children: any
  } & ButtonProps
> = ({ children, ...btnProps }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.buttonWrapper}>
          <Button {...btnProps}>{children}</Button>
        </div>
        <div className={styles.birdBox}>
          <div className={`${styles.bird} ${styles.wakeup}`}>
            <div className={styles.birdFace}></div>
          </div>
          <div className={`${styles.bird} ${styles.wakeup}`}>
            <div className={styles.birdFace}></div>
          </div>
          <div className={styles.bird}>
            <div className={styles.birdFace}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirdButton
