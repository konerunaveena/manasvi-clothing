import { take, takeEvery, takeLatest, delay, put } from "redux-saga/effects";


export function* onIncrement(){
    yield console.log("I'm Incremented");
    yield delay(3000);
    yield put({type : "INCREMENT_FROM_SAGA"});
}

export function* incrementSaga(){
    /*while(true){
        yield take('INCREMENT');
        console.log("i'm incremented");
        yield delay(5000);
    }*/
    //yield take('INCREMENT');
    //yield takeEvery('INCREMENT',onIncrement)

    yield takeLatest('INCREMENT',onIncrement)
    

}