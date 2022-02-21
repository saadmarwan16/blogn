import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Loader show />
      <button onClick={() => toast.success('Hello, toast')}>Toast me</button>
    </div>
  )
}

export default Home
