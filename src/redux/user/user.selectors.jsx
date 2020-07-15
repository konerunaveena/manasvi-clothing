import  { createSelector } from 'reselect';

//input selector
const selectUser = state =>state.user;

//output selector combination of arrary and function
export const selectCurrentUser = createSelector(
    [selectUser] ,
    (user) =>user.currentUser
);
