import { createReducer , on } from '@ngrx/store';
import { UserResponse } from 'src/app/models';
import * as actions from '../../actions/users/user.action';

export interface UsersState {
    users : UserResponse[];
}

const initialState : UserResponse[] = [];  

export const UsersReducer = createReducer(
    initialState,

    on( actions.storeUsersSuccess , (state , {users}   ) => {

        return users;
    }) 
)