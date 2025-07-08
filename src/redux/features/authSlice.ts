import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Define auth state type
interface AuthSlice {
  user: User | null;
}

// Load and validate user from localStorage
let userFromStorage: User | null = null;

try {
  const raw = localStorage.getItem("user");
  const parsed = raw ? JSON.parse(raw) : null;

  // ✅ Basic validation
  if (parsed?.email && parsed?.password) {
    userFromStorage = parsed;
  }
} catch {
  userFromStorage = null;
}

// Initial state
const initialState: AuthSlice = {
  user: userFromStorage,
};

// Create the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
