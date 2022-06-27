import styles from './Player.module.scss'

//img
import Playing from '../../../public/Playing.svg'
import Pause from '../../../public/pause.svg'
import PlayNext from '../../../public/play_next.svg'
import PlayPrevious from '../../../public/play_previouls.svg'
import Repeat from '../../../public/repeat.svg'
import Shuffle from '../../../public/shuffle.svg'
import Play from '../../../public/play.svg'

import Image from 'next/image'



export default function Player() {

  return (
    <div className={styles.playerContainer}>
      <header>
        <Image src={Playing} alt="" />
        <strong>Tocando agora</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>

      <footer className={styles.empty}>

        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <Image src={Shuffle} alt='' /></button>
          <button type="button">
            <Image src={PlayPrevious} alt='' />
          </button>
          <button type="button" className={styles.playButton}>
            <Image src={Play} alt='' />
          </button>
          <button type="button">
            <Image src={PlayNext} alt='' />
          </button>
          <button type="button">
            <Image src={Repeat} alt='' />
          </button>
        </div>
      </footer>
    </div>
  )
}
