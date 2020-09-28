import { createSlice } from '@reduxjs/toolkit';

const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState: { type: null, channel: null },
  reducers: {
    showModal(state, { payload: { type, channel } }) {
      return { type, channel };
    },
    hideModal() {
      return { type: null, channel: null };
    },
  },
});

export const modalInfoActions = {
  ...modalInfoSlice.actions,
};

export const modalInfoReducer = modalInfoSlice.reducer;
