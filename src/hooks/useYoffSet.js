import { useEffect, useState } from 'react'

const useYoffSet = () => {
    const [offSetY, setOffsetY] = useState(0)

    const handleScroll = () => {
        setOffsetY(window.pageYOffset)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [offSetY])

    return { offSetY }
}

export default useYoffSet
