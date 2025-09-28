import * as Unicons from '@iconscout/react-unicons'
import { typeModel, typeReduceModel, typeFilterModel } from '../reference.js'

export const targetMap = (classes, operator = {}) => {
    const data = Array.isArray(classes) ? classes : [classes]
    const attributes = {
        class: data,
        operator: operator
    }
    return attributes
}

export const switchLayoutMap = ({ page, name, layout, value }) => {
    return {
        page: page ?? 'home',
        nameComponent: name,
        nameLayout: layout,
        value: value
    }
}

export const checkboxMap = (checkbox) => {
    const data = typeof checkbox === 'object' && checkbox !== null ? true : false
    if (data) {
        const attributes = {
            id: checkbox.id,
            value: checkbox.value ?? false
        }

        return attributes
    }
    return null
}

export const modalListMap = (open, type) => {
    const attributes = {
        open: open,
        type: type
    }
    return attributes
}

export const buildQueryParamsMap = ({ IDobject, action }) => {
    if (typeof action !== 'string' || !action.trim()) return console.error('"action" must be a non-empty string')
    if (!IDobject || typeof IDobject !== 'object') return console.error('"IDobject" must be an object like { key: value }')

    const hasValidKey = Object.entries(IDobject).some(([k, v]) =>
        k.trim() !== '' && v !== undefined && v !== null && v !== ''
    )
    if (!hasValidKey) return console.error('"IDobject" must have at least one key with a non-empty value')

    return new URLSearchParams({
        action: action,
        ...IDobject
    }).toString()
}

/* 
    props => property of component
    type => type of model. Can use 'goal', 'tag' or 'assignment'
    source => type of list according 'reduceModelMap'. 'support' to FETCH_SUPPORT_LIST or 'core' to FETCH_LIST
*/
export const filterGetModel = (props, type, source) => {
    if (!typeModel.includes(type)) return console.error('"type" parameter is invalid. Send a string supported type ["goal", "tag", "assignment"]')
    if (!typeReduceModel.includes(source)) return console.error('"source" parameter is invalid. Send a string supported source ["core", "support"]') 
    
    if (typeof props === 'object') {
        const [key, value] = Object.entries(props).find(
            ([k, v]) => typeFilterModel.includes(k) && (typeof v === 'number' || v === 'all')) ?? ['Without key', 'Without value']

        if (key === 'Without key' && value === 'Without value' ) {
            //This war is used to show a function does not according with structure filter
            console.warn(`Current filter don't use an ID.`)
        }

        return key && { 
            type: type,
            source: source,
            [key]: value,
        }
    }
}

export const iconMap = {
    goal: <Unicons.UilBullseye className='icon-st' />,
    assignment: <Unicons.UilListUiAlt className='icon-st' />,
    tag: <Unicons.UilLabelAlt className='icon-st' />,
    themes: <Unicons.UilSwatchbook className='icon-st' />,
    user: <Unicons.UilUser className='icon-st' />,
    config: <Unicons.UilSlidersVAlt className='icon-st' />,
    calendar: <Unicons.UilCalendar className='icon-st' />,
    schedule: <Unicons.UilCalendarAlt className='icon-st' />,
    comment: <Unicons.UilCommentAltNotes className='icon-st' />,
    clock: <Unicons.UilClock className='icon-st' />,
    objectives: <Unicons.UilCreateDashboard className='icon-st' />,
    edit: <Unicons.UilPen className='icon-st' />,
    editbox: <Unicons.UilEdit className='icon-st' />,
    remove: <Unicons.UilTrashAlt className='icon-st' />,
    searchalt: <Unicons.UilSearchAlt className='icon-st' />,
    search: <Unicons.UilSearch className='icon-st' />,
    layoutgrid: <Unicons.UilWebGrid className='icon-st' />,
    chartbar: <Unicons.UilChartBar className='icon-st' />,
    filter: <Unicons.UilFilter className='icon-st' />,
    monitor: <Unicons.UilMonitor className='icon-st' />,
    ellipsisv: <Unicons.UilEllipsisV className='icon-st' />,
    arrowaltv: <Unicons.UilArrowsVAlt className='icon-st' />,
    plus: <Unicons.UilPlus className='icon-st' />,
    close: <Unicons.UilTimes className='icon-st' />,
    check: <Unicons.UilCheck className='icon-st' />,
    cancel: <Unicons.UilTimesCircle className='icon-st' />,
    save: <Unicons.UilSave className='icon-st' />,
    progress: <Unicons.UilSpinnerAlt className='icon-st' />,
    undefined: <Unicons.UilExclamationOctagon className='icon-st' />
}