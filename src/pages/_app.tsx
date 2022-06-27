import Header from '../components/Header/Header'
import Player from '../components/Player/Player'

import '../styles/globals.scss'
import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.appWrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
