"use client"

import React, { useEffect, useState } from "react"
import Card from "@/components/Card"
import styles from "../page.module.css"
import { images, urls } from "../constants"
import Loader from "@/components/Loader"
import { useSwapiData } from "@/context/DataContext"
import Link from "next/link"
import { useRouter } from "next/navigation"

type TPlanet = {
  name: string
  url: string
}

const getData = async (page: number) => {
  try {
    const url = `${urls.planets}?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results as TPlanet[]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const Planets = () => {
  const [planets, setPlanets] = useState<TPlanet[]>([])
  const [page, setPage] = useState(1)

  const { error, loading, endOfData, setEndOfData, setLoading } = useSwapiData()

  const router = useRouter()

  useEffect(() => {
    if (endOfData) {
      router.push("/not-found")
      return
    }

    if (page < 1) return
    setLoading(true)

    getData(page)
      .then((data) => {
        data.length === 0 ? setEndOfData(true) : setPlanets(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        router.push("/not-found")
      })
    router.push(`/planets?page=${page}`)
  }, [endOfData, page, router, setEndOfData, setLoading])

  const handlePage = (action: string) => {
    action === "increase" ? setPage(page + 1) : setPage(page - 1)
    if (page < 1) return
    if (!planets) {
      router.push(`/planets?page=${page}`)
    }
  }

  return (
    <main className={styles.main}>
      {loading && <Loader />}
      {error && <p>Error</p>}
      <div className={styles.container}>
        {planets?.map((planet: TPlanet) => (
          <Link
            key={planet.name}
            href={`/planets/detail?planetName=${encodeURIComponent(
              planet.name
            )}&planetId=${planet.url.split("/")[5]}`}
          >
            <Card name={planet.name} image={images.planets} url={planet.url} />
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

export default Planets
