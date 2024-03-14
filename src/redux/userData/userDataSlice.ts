import { createSlice } from "@reduxjs/toolkit";
import { fetchUserSavedAlbums } from "./userDataOperations";

export interface AlbumState {
  albums: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  albums: [],
  status: "idle",
  error: null,
} satisfies AlbumState as AlbumState;

// Define slice
const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSavedAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserSavedAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = action.payload;
      })
      .addCase(fetchUserSavedAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Failed to fetch user saved albums";
      });
  },
});

// Export actions and reducer
export default albumSlice.reducer;
