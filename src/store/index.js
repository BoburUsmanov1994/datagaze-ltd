import create from 'zustand'
import {devtools, persist} from "zustand/middleware";


let store = (set) => ({
    user: null,
    isAuthenticated: false,
    breadcrumbs: [],
    dateRange: null,
    setUser: (user) => set(state => ({...state, user})),
    setAuth: (isAuthenticated) => set(state => ({...state, isAuthenticated})),
    setBreadcrumbs: (breadcrumbs) => set(state => ({...state, breadcrumbs})),
    setDateRange: (dateRange) => set(state => ({...state, dateRange})),
})

let settingsStore = (set) => ({
    token: null,
    darkMode: false,
    isMenuOpen: true,
    lang: 'uz',
    setToken: (token) => set(state => ({...state, token})),
    setLang: (lang) => set(state => ({...state, lang})),
    setMode: () => set(state => ({...state, darkMode: !state.darkMode})),
    setOpenMenu: () => set(state => ({...state, isMenuOpen: !state.isMenuOpen})),
})


store = devtools(store);
settingsStore = devtools(settingsStore)
settingsStore = persist(settingsStore, {name: 'settings'});

export const useStore = create(store)
export const useSettingsStore = create(settingsStore)

