import React from 'react'
import './style.scss'
import { motion } from 'framer-motion'
import { MdLocationPin, MdCall } from 'react-icons/md'
import { BsHourglassSplit } from 'react-icons/bs'

const Conatct: React.FC = () => {

  const option = {
    initial: {
      x: "-100%",
      opacity: 0
    },
    whileInView: {
      x: 0,
      opacity: 1
    },
    transition: {
      delay: 0.3
    }
  }

  return (

    <section className='contact'>

      <div className="contact-1">
        <div>
          <h3><MdCall /> Call Us</h3>
          <motion.p {...option}>+91 7588535092</motion.p>
          <motion.p {...option}>+91 9389603522</motion.p>
        </div>
        <div>
          <h3><MdLocationPin /> Location</h3>
          <motion.p {...option}>Sangamner, Maharashtra 422608</motion.p>
        </div>
        <div>
          <h3><BsHourglassSplit /> Business Hours</h3>
          <motion.p
            {...option}
          >09:00 to 18:00</motion.p>
        </div>
      </div>

      <div className="contact-2">
        <motion.form
          initial={{
            y: "-100%",
            opacity: 0
          }}
          whileInView={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.1
          }}
        >

          <h2>Contact Us</h2>

          <input type="text" placeholder='Name' />
          <input type="email" placeholder='Email' />

          <textarea placeholder='Message...' cols={30} rows={10}></textarea>

          <button type='submit'>Send</button>

        </motion.form>
      </div>

    </section>
  )
}

export default Conatct