import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

export interface UserState {
    loginAttempts: number,
    loginFailure: ()=> void,
}

export const useUserStore = create<UserState>()(
    devtools(
        persist(
            (set)=>({
            loginAttempts: 0,
            loginFailure: () => set(({loginAttempts}) => ({loginAttempts: loginAttempts + 1}))
            }),
            {name: 'user-storage'}
        )
    )
)

