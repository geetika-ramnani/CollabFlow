import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { boardService } from '../services/board.service'

// Async thunks for API calls
export const loadBoards = createAsyncThunk(
	'board/loadBoards',
	async (_, { rejectWithValue }) => {
		try {
			const boards = await boardService.query()
			return boards
		} catch (err) {
			console.log('Cannot load boards', err)
			return rejectWithValue(err.message)
		}
	}
)

export const loadBoard = createAsyncThunk(
	'board/loadBoard',
	async (boardId, { rejectWithValue }) => {
		try {
			const board = await boardService.getById(boardId)
			return board
		} catch (err) {
			console.log('board cmp - failed to load board', err)
			return rejectWithValue(err.message)
		}
	}
)

export const addBoard = createAsyncThunk(
	'board/addBoard',
	async (board, { rejectWithValue }) => {
		try {
			const savedBoard = await boardService.save(board)
			return savedBoard
		} catch (err) {
			console.log('Cannot add board', err)
			return rejectWithValue(err.message)
		}
	}
)

export const updateBoard = createAsyncThunk(
	'board/updateBoard',
	async (board, { rejectWithValue }) => {
		try {
			await boardService.save(board)
			return board
		} catch (err) {
			console.log('Cannot save board', err)
			return rejectWithValue(err.message)
		}
	}
)

export const removeBoard = createAsyncThunk(
	'board/removeBoard',
	async (boardId, { rejectWithValue }) => {
		try {
			await boardService.remove(boardId)
			return boardId
		} catch (err) {
			console.log('Cannot remove board', err)
			return rejectWithValue(err.message)
		}
	}
)

export const removeGroup = createAsyncThunk(
	'board/removeGroup',
	async ({ groupId, boardId }, { rejectWithValue }) => {
		try {
			const savedBoard = await boardService.removeGroup(groupId, boardId)
			return savedBoard
		} catch (err) {
			console.log('Cannot remove group', err)
			return rejectWithValue(err.message)
		}
	}
)

export const saveGroup = createAsyncThunk(
	'board/saveGroup',
	async ({ group, boardId }, { rejectWithValue }) => {
		try {
			const savedBoard = await boardService.saveGroup(group, boardId)
			return savedBoard
		} catch (err) {
			console.log('Cannot save group', err)
			return rejectWithValue(err.message)
		}
	}
)

export const removeTask = createAsyncThunk(
	'board/removeTask',
	async ({ taskId, groupId, boardId }, { rejectWithValue }) => {
		try {
			const savedBoard = await boardService.removeTask(taskId, groupId, boardId)
			return savedBoard
		} catch (err) {
			console.log('Cannot remove task', err)
			return rejectWithValue(err.message)
		}
	}
)

export const saveTask = createAsyncThunk(
	'board/saveTask',
	async ({ task, groupId, boardId }, { rejectWithValue }) => {
		try {
			const savedBoard = await boardService.saveTask(task, groupId, boardId)
			return savedBoard
		} catch (err) {
			console.log('Cannot save task', err)
			return rejectWithValue(err.message)
		}
	}
)

const initialState = {
	board: null,
	boards: [],
	lastRemovedBoard: null,
	loading: false,
	error: null,
}

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoard: (state, action) => {
			state.board = action.payload
		},
		setBoards: (state, action) => {
			state.boards = action.payload
		},
		clearError: (state) => {
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			// Load boards
			.addCase(loadBoards.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loadBoards.fulfilled, (state, action) => {
				state.loading = false
				state.boards = action.payload
			})
			.addCase(loadBoards.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Load single board
			.addCase(loadBoard.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loadBoard.fulfilled, (state, action) => {
				state.loading = false
				state.board = action.payload
			})
			.addCase(loadBoard.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Add board
			.addCase(addBoard.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(addBoard.fulfilled, (state, action) => {
				state.loading = false
				state.boards.push(action.payload)
			})
			.addCase(addBoard.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Update board
			.addCase(updateBoard.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateBoard.fulfilled, (state, action) => {
				state.loading = false
				state.board = action.payload
				state.boards = state.boards.map((board) =>
					board._id === action.payload._id ? action.payload : board
				)
			})
			.addCase(updateBoard.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Remove board
			.addCase(removeBoard.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(removeBoard.fulfilled, (state, action) => {
				state.loading = false
				const lastRemovedBoard = state.boards.find(
					(board) => board._id === action.payload
				)
				state.boards = state.boards.filter((board) => board._id !== action.payload)
				state.lastRemovedBoard = lastRemovedBoard
			})
			.addCase(removeBoard.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Remove group
			.addCase(removeGroup.fulfilled, (state, action) => {
				state.board = action.payload
			})
			// Save group
			.addCase(saveGroup.fulfilled, (state, action) => {
				state.board = action.payload
			})
			// Remove task
			.addCase(removeTask.fulfilled, (state, action) => {
				state.board = action.payload
			})
			// Save task
			.addCase(saveTask.fulfilled, (state, action) => {
				state.board = action.payload
			})
	},
})

export const { setBoard, setBoards, clearError } = boardSlice.actions
export { boardSlice }
