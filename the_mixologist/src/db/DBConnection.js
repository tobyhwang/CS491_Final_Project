import ServiceKey from './ServiceKey';

// const Datastore = require('@google-cloud/datastore')({
//     projectId: ServiceKey.project_id,
//     keyFilename: ServiceKey.datastore.gcpDatastoreUserServiceKeyPath,
// })
import Datastore from '@google-cloud/datastore';
const datastore = Datastore({
    projectId: ServiceKey.project_id,
    keyFilename: ServiceKey.datastore.gcpDatastoreUserServiceKeyPath,
})


// class Items extends Component {
    
//       constructor(props){
//           super(props);
//           this.state ={
//             items:['gin', 'whiskey', 'vodka'],
//             message: ''
//         };
    
//       }

export default Datastore;