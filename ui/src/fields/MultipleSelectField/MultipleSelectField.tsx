import React from 'react'
import { Select } from 'antd'
import { WidgetField } from '@tesler-ui/core/interfaces/widget'
import { buildBcUrl } from '@tesler-ui/core'
import { connect } from 'react-redux'
import { MultivalueSingleValue } from '@tesler-ui/core/interfaces/data'
import { SelectProps } from 'antd/lib/select'
//import styles from './MultipleSelectField.module.css'
import checkbox from './img/checkbox.svg'
import { AppState } from '../../interfaces/storeSlices'

interface MultipleSelectFieldProps {
    value: MultivalueSingleValue[]
    values: Array<{ value: string }>
    meta: WidgetField
    widgetName: string
    onChange?: (value: MultivalueSingleValue[]) => void
}

//todo: it's just dirty copy from client project. refactoring is needed
const MultipleSelectField: React.FunctionComponent<MultipleSelectFieldProps> = props => {
    const { value, values, onChange } = props
    const { Option } = Select

    const currentValues = React.useMemo(() => {
        return values?.map(item => {
            const valueIndex = value?.findIndex(v => v.value === item.value)
            return (
                <Option key={item.value} label={item.value}>
                    {valueIndex >= 0 ? <img alt="checkbox" src={checkbox} /> : <span />}
                    <span>{item.value}</span>
                </Option>
            )
        })
    }, [values, value, Option])

    const handleOnChange = React.useCallback(
        (v: string[]) => {
            const result: MultivalueSingleValue[] = []
            v.map(item => result.push({ id: item, value: item }))
            onChange?.(result)
        },
        [onChange]
    )

    const extendedProps: SelectProps<string[]> = {
        ...props,
        /* className: styles.container,
        dropdownClassName: styles.dropDownMenu,*/
        mode: 'multiple',
        optionLabelProp: 'label',
        value: value?.map(i => i.value),
        onChange: handleOnChange
    }

    return <Select {...extendedProps}>{currentValues}</Select>
}

export function mapStateToProps(state: AppState, ownProps: MultipleSelectFieldProps) {
    const widget = state.view.widgets.find(item => item.name === ownProps.widgetName)
    const bcName = widget?.bcName
    const bcRowMeta = bcName && state.view.rowMeta[bcName]
    const bcUrl = bcName && buildBcUrl(bcName, true)
    const rowMetaFields = bcUrl && (bcRowMeta as any)?.[bcUrl]?.fields
    const field = rowMetaFields?.find((item: any) => item.key === ownProps.meta.key)
    const values = field?.values
    return {
        values
    }
}

export default connect(mapStateToProps)(MultipleSelectField)
