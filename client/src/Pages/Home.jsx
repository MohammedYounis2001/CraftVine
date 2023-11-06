import React from 'react'
import Hero from '../Components/Landing/Hero'
import ExploreProducts from '../Components/Landing/ExploreProducts'
import Discount from '../Components/Landing/Discount'
import Service from '../Components/Landing/Service'
import BestSellery from '../Components/Landing/BestSellery'
import Category from '../Components/Landing/Category'

const Home = () => {
  return (
    <div>
      <Hero />
      <Service />
      <Discount />
      <BestSellery />
      <Category />
      <ExploreProducts />
    </div>
  )
}

export default Home
