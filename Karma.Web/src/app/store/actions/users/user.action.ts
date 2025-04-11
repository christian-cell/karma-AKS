import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { UserInfo, UserResponse } from "src/app/models";

export const addUser = createAction('Add User' , props<UserInfo>());
export const removeUser = createAction('Remove User' , props<UserInfo>())
export const clearUser = createAction('Clear User');
export const returnUsers = createAction('Return User');


export const storeUsers = createAction(
    '[User] add users from the API',
    props<{ order : string }>()
)

export const storeUsersSuccess = createAction(
    '[User] add users from the API success',
    props<{ users : UserResponse[] }>()
)

export const storeUsersFailure = createAction(
    '[Professionals] Get professionals json failure',
    props<{ error: HttpErrorResponse }>()
);