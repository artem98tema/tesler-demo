import React from 'react'
import { DictionaryProps } from '@tesler-ui/core/components/ui/Dictionary/Dictionary'
import { useSelector } from 'react-redux'
import { AppState } from '../../interfaces/storeSlices'
import { buildBcUrl } from '@tesler-ui/core'
import styles from './Dictionary.module.css'
import { RowMeta } from '@tesler-ui/core/interfaces/rowMeta'
import { EMPTY_ARRAY } from '../../constants/constants'
import { Dictionary as CoreDictionary } from '@tesler-ui/core'

function Dictionary(props: DictionaryProps) {
    const { value, meta, widgetName, backgroundColor } = props
    const bcName = useSelector((state: AppState) => state.view.widgets?.find(i => i.name === widgetName)?.bcName)
    const bcUrl = bcName && buildBcUrl(bcName, true)
    const rowMeta = useSelector((state: AppState) => bcName && bcUrl && state.view.rowMeta[bcName]?.[bcUrl])
    const rowFieldMeta = (rowMeta as RowMeta)?.fields.find(field => field.key === meta?.key)
    if (meta?.bgColorKey) {
        return (
            <div
                className={styles.coloredValue}
                style={backgroundColor ? { color: backgroundColor, backgroundColor: `${backgroundColor}33` } : undefined}
            >
                {value}
            </div>
        )
    }

    return (
        <CoreDictionary
            {...props}
            values={
                (rowFieldMeta ? rowFieldMeta.values : EMPTY_ARRAY) as Array<{
                    value: string
                    icon: string
                }>
            }
        />
    )
}

export default React.memo(Dictionary)
