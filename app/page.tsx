import styles from "./page.module.css"
import Image from "next/image"
import swlogo from "../public/images/swlogo.png"

export default function Home() {
  return (
    <main className={styles.welcome} data-testid="test-home">
      <Image
        data-testid="home-image"
        src={swlogo}
        width={300}
        height={200}
        alt="logo"
      />
      <h2 data-testid="home-text">
        A long time ago in a Galaxy, far, far away...
      </h2>
    </main>
  )
}
