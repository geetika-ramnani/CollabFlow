import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../services/user.service'

// Async thunks for API calls
export const loadUsers = createAsyncThunk(
	'user/loadUsers',
	async (_, { rejectWithValue }) => {
		try {
			const users = await userService.getUsers()
			return users
		} catch (err) {
			console.log('UserActions: err in loadUsers', err)
			return rejectWithValue(err.message)
		}
	}
)

export const loadUser = createAsyncThunk(
	'user/loadUser',
	async (userId, { rejectWithValue }) => {
		try {
			const user = await userService.getById(userId)
			return user
		} catch (err) {
			console.log('Cannot load user', err)
			return rejectWithValue(err.message)
		}
	}
)

export const login = createAsyncThunk(
	'user/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const user = await userService.login(credentials)
			return user
		} catch (err) {
			console.log('Cannot login', err)
			return rejectWithValue(err.message)
		}
	}
)

export const signup = createAsyncThunk(
	'user/signup',
	async (credentials, { rejectWithValue }) => {
		try {
			const user = await userService.signup(credentials)
			return user
		} catch (err) {
			console.log('Cannot signup', err)
			return rejectWithValue(err.message)
		}
	}
)

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue }) => {
		try {
			await userService.logout()
			return null
		} catch (err) {
			console.log('Cannot logout', err)
			return rejectWithValue(err.message)
		}
	}
)

export const removeUser = createAsyncThunk(
	'user/removeUser',
	async (userId, { rejectWithValue }) => {
		try {
			await userService.remove(userId)
			return userId
		} catch (err) {
			console.log('UserActions: err in removeUser', err)
			return rejectWithValue(err.message)
		}
	}
)

const initialState = {
	user: userService.getLoggedinUser(),
	users: [],
	watchedUser: null,
	loading: false,
	error: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		setWatchedUser: (state, action) => {
			state.watchedUser = action.payload
		},
		clearError: (state) => {
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			// Load users
			.addCase(loadUsers.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loadUsers.fulfilled, (state, action) => {
				state.loading = false
				state.users = action.payload
			})
			.addCase(loadUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Load single user
			.addCase(loadUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.loading = false
				state.watchedUser = action.payload
			})
			.addCase(loadUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Login
			.addCase(login.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Signup
			.addCase(signup.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Logout
			.addCase(logout.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(logout.fulfilled, (state) => {
				state.loading = false
				state.user = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Remove user
			.addCase(removeUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(removeUser.fulfilled, (state, action) => {
				state.loading = false
				state.users = state.users.filter((user) => user._id !== action.payload)
			})
			.addCase(removeUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const { setUser, setWatchedUser, clearError } = userSlice.actions
export { userSlice }
