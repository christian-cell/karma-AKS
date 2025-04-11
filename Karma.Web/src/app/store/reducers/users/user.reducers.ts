import { UserInfo } from '../../../models';
import { createReducer , on } from '@ngrx/store';
import { addUser, removeUser } from '../../actions/users/user.action';

export interface userState {
    User: UserInfo
}

export const initialUserEntries : UserInfo = {} ;

export const UserReducer = createReducer(
    
    initialUserEntries,

    on(addUser , (entries , User)=>{
        const entriesClone : UserInfo = User;
        return entriesClone;
    }),
    
    on(removeUser , (EmptyObject) => {
        const entriesClone : UserInfo = EmptyObject;
        return entriesClone;
    })
    
) 