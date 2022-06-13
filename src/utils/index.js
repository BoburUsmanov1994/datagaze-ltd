import {includes} from "lodash";

const addDetectClick =  ({setOpen,classNames = []}) => {
    window.addEventListener("click", (e) => {
        if (!classNames.some(className => e.target.classList.contains(className))) {
            setOpen(false);
        }
    });
}
const removeDetectClick = () => {
    window.removeEventListener('click',addDetectClick,false);
}

const hasAccess = (roles = [], can = '') => {
    let access = false;
    if (includes(roles, can)) {
        access = true;
    }
    return access;
}


const getSelectOptionsListFromData = (data = [], value = 'id', label = 'title') => {
    return data.map(item => ({ value: item[value], label: item[label] })) || [];
}


export {
    addDetectClick,
    removeDetectClick,
    hasAccess,
    getSelectOptionsListFromData
}