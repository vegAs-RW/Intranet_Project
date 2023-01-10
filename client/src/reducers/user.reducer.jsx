import { LOG_USER } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state=initialState, action) {
    switch (action.type) {
        case LOG_USER:
            return action.payload

        default:
            return state
    }
}