'use client'
import styles from './page.module.css'
import ShareBioAge from '@/components/ShareBioAge'


export default function Home() {
  return (
      <main className={styles.main}>
        <ShareBioAge />
      </main>
  )
}
