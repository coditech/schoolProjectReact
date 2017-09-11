import storeFactory from './AppStore';


let ids = 0;
const storeId = id || ids++;
const storeName = `SMP_${storeId}`;


const localStorageFactory = (id) => {
    const storeId = id || ids++;
    const storeName = `SMP_${storeId}`;

    const {getData} = storeFactory();


}