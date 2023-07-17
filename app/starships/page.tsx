"use client"

import React, { useEffect, useState } from "react"
import Card from "@/components/Card"
import styles from "../page.module.css"
import { useRouter } from "next/navigation"
import { useSwapiData } from "@/context/DataContext"
import { images, urls } from "../constants"
import Loader from "@/components/Loader"
import Link from "next/link"

type TStarship = {
  name: string
  url: string
}

const getData = async (page: number) => {
  try {
    const url = `${urls.starships}?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results as TStarship[]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

export default function Starships() {
  const [page, setPage] = useState(1)
  const [starships, setStarships] = useState<TStarship[]>([])

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
        data.length === 0 ? setEndOfData(true) : setStarships(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        router.push("/404")
      })
    router.push(`/starships?page=${page}`)
  }, [endOfData, page, router])

  const handlePage = (action: string) => {
    action === "increase" ? setPage(page + 1) : setPage(page - 1)
    if (page < 1) return
    if (!starships) {
      router.push("/404")
    }
  }

  return (
    <>
      <main className={styles.main}>
        {loading && <Loader />}
        {error && <p>Error</p>}
        <div className={styles.container}>
          {starships.map((ship: TStarship) => (
            <Link
              key={ship.name}
              href={`/starships/detail?starshipName=${encodeURIComponent(
                ship.name
              )}&starshipId=${ship.url.split("/")[5]}`}
            >
              <Card name={ship.name} url={ship.url} image={images.starships} />
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
    </>
  )
}
