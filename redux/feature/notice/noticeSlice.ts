import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type Notice from '../../../types/notice';

interface NoticeState {
  loading: boolean;
  notices: Notice[];
  error: string | null;
}

const fetchAllNotices = createAsyncThunk(
  'notice/fetchAll',
  async ({ token }: { token: string }) => {
    const { error, data } = await fetch(`${process.env['API_BASE']}/notices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (error) throw new Error(error);

    return data.notices as Notice[];
  }
);

const issueNotice = createAsyncThunk(
  'notice/issue',
  async ({
    token,
    notice,
  }: {
    token: string;
    notice: Pick<Notice, 'title' | 'body' | 'audience'>;
  }) => {
    const { error, data } = await fetch(`${process.env['API_BASE']}/notices`, {
      method: 'POST',
      body: JSON.stringify(notice),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => res.json());
    if (error) throw new Error(error);

    return data.notice as Notice;
  }
);

const patchNoticeById = createAsyncThunk(
  'notice/patchById',
  async ({
    id,
    token,
    notice,
  }: {
    id: number;
    token: string;
    notice: Pick<Notice, 'title' | 'body' | 'audience'>;
  }) => {
    const { error, data } = await fetch(`${process.env['API_BASE']}/notices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(notice),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => res.json());
    if (error) throw new Error(error);

    return data.notice as Notice;
  }
);

const initialState: NoticeState = {
  loading: false,
  notices: [],
  error: null,
};

export const noticeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNotices.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.notices = action.payload;
    });
    builder.addCase(fetchAllNotices.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchAllNotices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
      state.notices = [];
    });

    builder.addCase(issueNotice.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.notices = [action.payload, ...state.notices];
    });
    builder.addCase(issueNotice.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(issueNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(patchNoticeById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.notices = state.notices.map((notice) =>
        notice.id !== action.payload.id ? notice : action.payload
      );
    });
    builder.addCase(patchNoticeById.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(patchNoticeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Unable to edit';
    });
  },
});

export { fetchAllNotices, issueNotice, patchNoticeById };

export const selectNoticeError = (state: RootState) => state.notice.error;
export const selectNoticeLoading = (state: RootState) => state.notice.loading;
export const selectNotices = (state: RootState) => state.notice.notices;
export const selectNoticeById = (id: number) => (state: RootState) =>
  state.notice.notices.find((notice) => notice.id === id);

export default noticeSlice.reducer;
