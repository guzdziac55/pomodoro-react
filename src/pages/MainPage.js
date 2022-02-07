/* eslint-disable import/no-cycle */
import React, { useRef } from 'react'
import LayoutComponent from './LayoutComponent'
import classes from './MainPage.module.css'
import Footer from '../components/Footer/Footer'
import FullAppComponent from '../components/FullAppComponent/FullAppComponent'
import InfoSection from '../components/InfoSection/InfoSection'

function MainPage() {
    const infoRef = useRef()
    return (
        <LayoutComponent>
            <div className={classes.containerFull}>
                <FullAppComponent infoRef={infoRef} />
            </div>

            <InfoSection infoRef={infoRef} />
            <Footer />
        </LayoutComponent>
    )
}

export default MainPage
