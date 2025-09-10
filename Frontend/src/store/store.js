import { configureStore } from '@reduxjs/toolkit'
import { boardSlice } from './board.slice.js'
import { userSlice } from './user.slice.js'
import { systemSlice } from './system.slice.js'

export const store = configureStore({
	reducer: {
		boardModule: boardSlice.reducer,
		userModule: userSlice.reducer,
		systemModule: systemSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
			},
		}),
	devTools: process.env.NODE_ENV !== 'production',
})

// Optional: Keep the subscription for debugging in development
if (process.env.NODE_ENV === 'development') {
	store.subscribe(() => {
		console.log('**** Store state changed: ****')
		console.log('storeState:\n', store.getState())
		console.log('*******************************')
	})
}