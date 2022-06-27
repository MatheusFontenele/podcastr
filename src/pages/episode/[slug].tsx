import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { api } from "../../services/api"

import arrowLeft from "../../../public/arrow-left.svg"

import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString"
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from "./episode.module.scss"

interface Episode {
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

interface EpisodeProps {
  episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {

  const router = useRouter()

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <button>
          <Image src={arrowLeft} alt="Voltar" />
        </button>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { slug } = ctx.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    thumbnail: data.thumbnail,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
    description: data.description
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24
  }
}