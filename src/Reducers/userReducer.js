const initialState = {
    isAddUserLoading: false,
    all_users: [],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_PAGE_ONE_REQUEST':
            return {
                ...state, isGetUsersPageOneLoading: true
            }
        case 'GET_USERS_PAGE_ONE_SUCCESS':
            state.all_users = action.payload;
            return {
                ...state, isGetUsersPageOneLoading: false
            }
        case 'GET_USERS_PAGE_ONE_FAILURE':
            return {
                ...state, isGetUsersPageOneLoading: false
            }
        case 'GET_USERS_PAGE_TWO_REQUEST':
            return {
                ...state, isGetUsersPageTwoLoading: true
            }
        case 'GET_USERS_PAGE_TWO_SUCCESS':
            state.all_users = action.payload;
            return {
                ...state, isGetUsersPageTwoLoading: false
            }
        case 'GET_USERS_PAGE_TWO_FAILURE':
            return {
                ...state, isGetUsersPageTwoLoading: false
            }
        case 'ADD_NEW_USER_REQUEST':
            return {
                ...state, isGetAllSlotsRequestLoading: true
            }
        case 'ADD_NEW_USER_SUCCESS':
            state.all_users.push(action.payload)
            return {
                ...state, isGetAllSlotsRequestLoading: false
            }
        case 'ADD_NEW_USER_FAILURE':
            return {
                ...state, isGetAllSlotsRequestLoading: false
            }
        case 'DELETE_USER_REQUEST':
            return {
                ...state, isDeleteUserRequestLoading: true
            }
        case 'DELETE_USER_SUCCESS':
            let users = state.all_users.filter(user => {
                return (user.id !== action.payload)
            })
            state.all_users = users;
            return {
                ...state, isDeleteUserRequestLoading: false
            }
        case 'DELETE_USER_FAILURE':
            return {
                ...state, isDeleteUserRequestLoading: false
            }
        case 'UPDATE_USER_REQUEST':
            return {
                ...state, isUpdateUserRequestLoading: true
            }
        case 'UPDATE_USER_SUCCESS':
            state.all_users.forEach(user => {
                if (user.id === action.payload.id) {
                    user.first_name = action.payload.first_name
                    user.last_name = action.payload.last_name
                    user.email = action.payload.email
                }
            })
            return {
                ...state, isUpdateUserRequestLoading: false
            }
        case 'UPDATE_USER_FAILURE':
            return {
                ...state, isUpdateUserRequestLoading: false
            }
        default:
            return state;
    }
}