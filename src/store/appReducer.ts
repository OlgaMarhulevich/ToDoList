import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
            state.error = action.payload.error
        },
        setAppInitializingAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppInitializingAC} = slice.actions
