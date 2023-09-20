'use client'
import styles from './page.module.css'
import ShareBioAge from '@/components/ShareBioAge'
import BioAge from '@/components/BioAge'
import TestDownload from '@/components/TestDownload'
import ShareBioAgeV2 from '@/components/ShareaBioAgeV2'


export default function Home() {
  return (
      <main className={styles.main}>
        {/*<ShareBioAge />*/}
        <ShareBioAgeV2 />
        {/*<TestDownload/>*/}
      </main>
  )
}
