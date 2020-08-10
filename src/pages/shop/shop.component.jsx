import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase-utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';



import './shop.styles.scss';
import collectionsOverviewComponent from '../../components/collections-overview/collections-overview.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner  = WithSpinner(CollectionPage);

// const ShopPage = ({match}) => (
//    <div className="shop-page">
//        <Route exact path={`${match.path}`} component={CollectionOverview}></Route>
//        <Route path={`${match.path}/:collectionId`} component={CollectionPage}></Route>
//     </div>
// )

class ShopPage extends React.Component{
    state = {
        isLoading : true
    }
    unsubscribeFromSnapshot = null;
    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef =  firestore.collection('collections');

        // fetch('https://firebase.googleapis.com/v1/projects/manasvi-db/databases/(default)/documents/collections')
        // .then(
        //     response =>response.json()
        // )
        // .then(
        //     collections => console.log(collections)
        // );


        collectionRef.get().then(snapshot =>
            {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);
                this.setState({isLoading : false});
            }
        )
    }
    render() {
        const { match } = this.props;
        const {isLoading } =this.state;
        return (
            <div className="shop-page">
                <Route exact 
                    path={`${match.path}`} 
                    render={(props) => <CollectionOverviewWithSpinner isLoading ={isLoading}{...props}/>}></Route>
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading ={isLoading}{...props} />}></Route>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    updateCollections : collectionsMap =>
    dispatch(updateCollections(collectionsMap)) 
})

export default connect(null,mapDispatchToProps)(ShopPage);