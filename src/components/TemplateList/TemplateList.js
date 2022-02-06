import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import TemplateItem from './TemplateItem'
import classes from './TemplateList.module.css'
import { selectTemplateList } from '../../store/taskList-slice'

function TemplateList() {
    const templates = useSelector(selectTemplateList)
    const [showList, setShowList] = useState(true)

    const toogleList = () => {
        setShowList((current) => setShowList(!current))
    }

    const templateList = templates.map((template) => (
        <TemplateItem
            key={template.id}
            id={template.id}
            name={template.templateName}
        />
    ))

    return (
        <>
            <h1>Templates</h1>
            <button
                type="button"
                className={classes.showButton}
                onClick={toogleList}
            >
                {showList ? 'Hide' : 'Show'}
            </button>
            {showList && (
                <ul className={classes.templateList}>
                    {templates.length === 0 ? (
                        <p className={classes.info}>There is no templates </p>
                    ) : (
                        templateList
                    )}
                </ul>
            )}
        </>
    )
}

export default TemplateList
