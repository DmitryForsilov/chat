import { createSlice } from '@reduxjs/toolkit';

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    toggleChannel(state, { payload: { id } }) {
      return id;
    },
  },
});

export const currentChannelIdActions = {
  ...currentChannelIdSlice.actions,
};

export const currentChannelIdReducer = currentChannelIdSlice.reducer;
