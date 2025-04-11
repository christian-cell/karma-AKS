import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from 'src/app/users/services';
import * as actions from '../../actions/users/user.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserResponse } from 'src/app/models';

@Injectable()

export class ProfessionalsJsonEffects {

    constructor( 
        private action$ :                   Actions,
        private usersService:               UsersService
    ){}

    loadDocuments$ = createEffect(() => {
        return this.action$
        .pipe(
            ofType(actions.storeUsers),
            switchMap( () =>
                {
                    return this.usersService.getUsers()
                    .pipe(
                        map( ( users : UserResponse[] ) => 
                        { 
                           
                            return actions.storeUsersSuccess({ users : users }) 
                        }),
                        
                        catchError(error => {
                            return of( actions.storeUsersFailure({ error : error }) )
                        })
                    )

                }
            )
        )
    })
}