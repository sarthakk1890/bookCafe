import React, { useEffect } from 'react'
import Image from '../../../assets/orderConfirm.png'
import './style.scss'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { resetCart } from '../../../redux/reducer/cartReducer'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentSuccess: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/orders/${id}`)
  }

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
          <button onClick={handleClick}>Check Status</button>
        </div>

      </main>
    </section>
  )
}

export default PaymentSuccess