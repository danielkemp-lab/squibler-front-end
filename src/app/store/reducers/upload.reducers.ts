import { UploadActionTypes, All } from "../actions/upload.actions";

export interface State {
  photoName: string;
  photoUrl: string;
}

export const initialState: State = {
  photoUrl: "",
  photoName: ""
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UploadActionTypes.UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        photoUrl: action.payload.user.profile.photoUrl,
        photoName: action.payload.user.profile.photo
      };
    }
    default: {
      return state;
    }
  }
}
