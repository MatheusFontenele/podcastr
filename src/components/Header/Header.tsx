import React from 'react'
import Image from 'next/image'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './Header.module.scss'
import logo from '../../../public/Logo.svg'

export default function Header() {

  const curruntDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  return (
    <header className={styles.headerContainer}>
      <Image src={logo} alt="podcastr" />
      <p>O melhor para voce ouvir, Sempre</p>
      <span>{curruntDate}</span>
    </header>
  )
}
