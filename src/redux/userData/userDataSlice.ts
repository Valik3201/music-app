import { createSlice } from "@reduxjs/toolkit";
import { fetchUserSavedAlbums, getUserPlaylists } from "./userDataOperations";

export interface UserDataState {
  albums: any[];
  playlists: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  albums: [],
  playlists: [],
  status: "idle",
  error: null,
} satisfies UserDataState as UserDataState;

const userDataSlice = createSlice({
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

    builder
      .addCase(getUserPlaylists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playlists = action.payload;
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch user playlists";
      });
  },
});

// Export actions and reducer
export default userDataSlice.reducer;
