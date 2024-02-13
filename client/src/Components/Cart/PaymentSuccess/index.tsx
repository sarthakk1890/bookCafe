import React, { useEffect } from 'react'
import Image from '../../../assets/orderConfirm.png'
import './style.scss'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { resetCart } from '../../../redux/reducer/cartReducer'

const PaymentSuccess: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCart());
  }, [])

  return (
    <section className='paymentSuccess center'>
      <main className='center'>
        <div className="heading center">
          <motion.img
            src={Image} alt="Confirmed Order"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          <motion.h1
            initial={{ y: '-100%' }}
            whileInView={{ y: 0 }}
          >Order Confirmed</motion.h1>
        </div>

        <div className="center">
          <p>Order Placed Successfully !!</p>
          <button>Check Status</button>
        </div>

      </main>
    </section>
  )
}

export default PaymentSuccess