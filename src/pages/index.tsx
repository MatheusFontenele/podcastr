/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from "next/link"
import { api } from '../services/api'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

import styles from '../styles/home.module.scss'

import playGreen from '../../public/play-green.svg'

interface EpisodesProps {
  id: string;
  title: string;
  members: string,
  publishedAt: string,
  thumbnail: string,
  description: string,
  duration: Number,
  durationAsString: string
  url: string
}

interface homeProps {
  lastestEpisodes: EpisodesProps[],
  allEpisodes: EpisodesProps[]
}

export default function Home({ lastestEpisodes, allEpisodes }: homeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos Lançamentos</h2>
        <ul>
          {
            lastestEpisodes.map(episode => {
              return (
                <li key={episode.id}>

                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button>
                    <Image src={playGreen} alt="play episodio" />
                  </button>

                </li>
              )
            })
          }
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos os episodios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duracao</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(episode => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>

                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button type='button'>
                      <Image src={playGreen} alt="play episodio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const data = response.data

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      thumbnail: episode.thumbnail,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
      description: episode.description
    }
  })

  const lastestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      lastestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}