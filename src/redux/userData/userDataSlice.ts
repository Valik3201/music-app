import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserSavedAlbums,
  getUserPlaylists,
  getUserTracks,
} from "./userDataOperations";

export interface UserDataState {
  albums: any[];
  playlists: any[];
  tracks: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState = {
  albums: [],
  playlists: [],
  tracks: [],
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
          action.error.message ?? "Failed to fetch user's saved albums";
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
        state.error =
          action.error.message ?? "Failed to fetch user's playlists";
      });

    builder
      .addCase(getUserTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracks = action.payload;
      })
      .addCase(getUserTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch user's tracks";
      });
  },
});

// Export actions and reducer
export default userDataSlice.reducer;
