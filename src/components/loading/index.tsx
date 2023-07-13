import React from 'react'
import styles from './index.module.less'

const Loading: React.FC = props => {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <span>Loading...</span>
        <div className={styles.circle}>
          <div className={styles.ring}></div>
        </div>
      </div>
    </div>
  )
}

// Loading.defaultProps = {
//   imgUrl: loading
// }

export default Loading
