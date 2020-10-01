import { createSlice } from '@reduxjs/toolkit';

const initialState = { type: null, channel: null };

const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    showModal(state, { payload: { type, channel } }) {
      return { type, channel };
    },
    hideModal() {
      return initialState;
    },
  },
});

export const modalInfoActions = {
  ...modalInfoSlice.actions,
};

export const modalInfoReducer = modalInfoSlice.reducer;
