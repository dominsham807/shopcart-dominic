import React from 'react'
import Banner from '../components/Banner'
import HomeCategory from '../components/HomeCategory'
import CategoryShowcase from '../components/CategoryShowcase'
import Register from '../components/Register'
import LocationSprade from '../components/LocationSprade'
import AboutUs from '../components/AboutUs'
import AppSection from '../components/AppSection'
import Sponsor from '../components/Sponsor'

const Home = () => {
    return (
        <div>
            <Banner />
            <HomeCategory />
            <CategoryShowcase />
            <Register />
            <LocationSprade />
            <AboutUs />
            <AppSection />
            {/* <Sponsor /> */}
        </div>
    )
}

export default Home