import * as types from "./actionTypes";

// action creator
export function beginApiCall() {
    return {type: types.BEGIN_API_CALL};
}