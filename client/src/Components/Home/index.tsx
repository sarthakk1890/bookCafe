import React from 'react'
import './style.scss'
import { motion } from 'framer-motion'
import FeaturedProducts from '../Products/FeaturedProducts'

const Home: React.FC = () => {

  const option = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    }
  }

  return (
    <>
      <section className='home'>
        <div>
          <motion.h1 {...option}>BookCafe</motion.h1>
          <motion.p
            {...option}
            transition={{ delay: 0.2 }}
          >
            Unleash Your Inner Reader
          </motion.p>
        </div>
        <motion.a
          href="#featured_products"
          initial={{
            y: "-100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{ delay: 0.4 }}
        >
          Explore Products
        </motion.a>
      </section>

      <FeaturedProducts/>

    </>
  )
}

export default Home;