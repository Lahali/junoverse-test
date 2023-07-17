"use client"

import React, { useEffect, useState } from "react"
import Card from "@/components/Card"
import styles from "../page.module.css"
import { useRouter } from "next/navigation"
import { images, urls } from "../constants"
import { useSwapiData } from "@/context/DataContext"
import Loader from "@/components/Loader"
import Link from "next/link"

type TFilms = {
  title: string
  url: string
}

const getData = async (page: number) => {
  try {
    const url = `${urls.films}?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results as TFilms[]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const Films = () => {
  const [films, setFilms] = useState<TFilms[]>([])
  const [page, setPage] = useState(1)

  const { error, loading, endOfData, setEndOfData, setLoading } = useSwapiData()

  const router = useRouter()

  useEffect(() => {
    if (endOfData) {
      router.push("/404")
      return
    }

    if (page < 1) return
    setLoading(true)

    getData(page)
      .then((data) => {
        setLoading(false)
        data.length === 0 ? setEndOfData(true) : setFilms(data)
      })
      .catch((error) => {
        console.log(error)
        router.push("/404")
      })
    router.push(`/films?page=${page}`)
  }, [endOfData, page, router])

  const handlePage = (action: string) => {
    action === "increase" ? setPage(page + 1) : setPage(page - 1)
    if (page < 1) return
    if (!films) {
      router.push("/404")
    }
  }

  return (
    <main className={styles.main} data-testid="test-films">
      {loading && <Loader />}
      {error && <p>Error</p>}
      <div className={styles.container}>
        {films.map((film: TFilms) => (
          <Link
            data-testid="film-link"
            href={`/films/detail?filmName=${encodeURIComponent(
              film.title
            )}&sfilmId=${film.url.split("/")[5]}`}
            key={film.title}
          >
            <Card name={film.title} url={film.url} image={images.films} />
          </Link>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={() => handlePage("increase")}
        >
          load more
        </button>
        <button
          className={page === 1 ? styles.hidden : styles.button}
          onClick={() => handlePage("decrease")}
        >
          go back
        </button>
      </div>
    </main>
  )
}

export default Films
