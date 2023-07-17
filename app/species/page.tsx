"use client"

import React, { useEffect, useState } from "react"
import Card from "@/components/Card"
import styles from "../page.module.css"
import { useRouter } from "next/navigation"
import { images, urls } from "../constants"
import { useSwapiData } from "@/context/DataContext"
import Loader from "@/components/Loader"
import Link from "next/link"

type TSpecies = {
  name: string
  url: string
}

const getData = async (page: number) => {
  try {
    const url = `${urls.species}?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    return data.results as TSpecies[]
  } catch (error) {
    throw new Error("Something went wrong")
  }
}

const Species = () => {
  const [species, setSpecies] = useState<TSpecies[]>([])
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
        data.length === 0 ? setEndOfData(true) : setSpecies(data)
      })
      .catch((error) => {
        console.log(error)
        router.push("/404")
      })
    router.push(`/species?page=${page}`)
  }, [endOfData, page, router])

  const handlePage = (action: string) => {
    action === "increase" ? setPage(page + 1) : setPage(page - 1)
    if (page < 1) return
    if (!species) {
      router.push("/404")
    }
  }

  return (
    <main className={styles.main}>
      {loading && <Loader />}
      {error && <p>Error</p>}
      <div className={styles.container}>
        {species.map((sp: TSpecies) => (
          <Link
            key={sp.name}
            href={`/species/detail?speciesName=${encodeURIComponent(
              sp.name
            )}&speciesId=${sp.url.split("/")[5]}`}
          >
            <Card
              key={sp.name}
              name={sp.name}
              url={sp.url}
              image={images.species}
            />
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

export default Species
