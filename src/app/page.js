"use client"
import styles from './page.module.css'
import ShareBioAge from '@/components/ShareBioAge'
import BioAge from '@/components/BioAge'

export default function Home() {
  return (
      <main className={styles.main}>
        <ShareBioAge />
      </main>
  )
}
