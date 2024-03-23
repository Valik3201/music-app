import { createSlice } from "@reduxjs/toolkit";
import {
  getUserSavedAlbums,
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
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserSavedAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserSavedAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.albums = action.payload as any[];
      })
      .addCase(getUserSavedAlbums.rejected, (state, action) => {
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
        state.playlists = action.payload as any[];
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message ?? "Failed to fetch current user's playlists";
      });

    builder
      .addCase(getUserTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserTracks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tracks = action.payload as any[];
      })
      .addCase(getUserTracks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch user's tracks";
      });
  },
});

// Export actions and reducer
export default userDataSlice.reducer;
