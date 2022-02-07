import { useCallback, useState } from 'react'

export const useCheckImage = () => {
    const [imageExist, setImageExist] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [avatarId, setAvatarId] = useState('')

    const checkImage = useCallback((imageCode) => {
        const url = `https://api.multiavatar.com/${imageCode}.png`

        setIsLoading(true)

        const request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.send()
        request.onload = () => {
            if (request.status === 200) {
                setImageExist(true)
                setAvatarId(imageCode)
            } else {
                setImageExist(false)
            }
            setIsLoading(false)
        }
    }, [])

    return [isLoading, imageExist, avatarId, checkImage]
}
