import React from 'react'
import AboutApp from './AboutApp/AboutApp'
import classes from './AppInfoSection.module.css'
import Features from './Features/Features'
import HeaderInfo from './HeaderInfo/HeaderInfo'
import HowToUse from './HowToUse/HowToUse'
import PomodoroTechnique from './PomodoroTechnique/PomodoroTechnique'

function AppInfoSection() {
    return (
        <div className={classes.appInfoContainer}>
            <HeaderInfo />
            <AboutApp />
            <PomodoroTechnique />
            <HowToUse />
            <Features />
        </div>
    )
}

export default AppInfoSection
