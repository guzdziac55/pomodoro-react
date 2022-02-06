import React, { useEffect, useState } from 'react'
import InfoOne from './InfoOne/InfoOne'
import classes from './InfoSection.module.css'
import InfoThree from './InfoThree/InfoThree'
import InfoTwo from './InfoTwo/InfoTwo'

function InfoSection({ infoRef }) {
    const [offsetY, setOffsetY] = useState(0)
    const handleScroll = () => {
        setOffsetY(window.pageYOffset)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [offsetY])

    return (
        <div className={classes.infoMain}>
            <section className={classes.infoContainer}>
                <InfoOne infoRef={infoRef} />
                <InfoTwo />
                <InfoThree />
            </section>
        </div>
    )
}

export default InfoSection
