import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
}

const systemSlice = createSlice({
	name: 'system',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
		loadingStart: (state) => {
			state.isLoading = true
		},
		loadingDone: (state) => {
			state.isLoading = false
		},
	},
})

export const { setLoading, loadingStart, loadingDone } = systemSlice.actions
export { systemSlice }
