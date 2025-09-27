import { getDocs, getDoc, collection, addDoc, query, where, doc, updateDoc, orderBy, limit, startAfter, deleteDoc, writeBatch } from 'firebase/firestore';
import {db} from '../firebase.js';
import products from '../db/products.json'

export async function getItems() {
    
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const items = querySnapshot.docs.map(doc => {
        return {id:doc.id, ...doc.data()};
    });

    console.log('Productos cargados');
    return items;
    };

    //Funciones de paginación

    export async function fetchPage(pageSize=5, field = 'title', start=null, order='asc') {
        const collectionRef = collection(db, 'productos');
        
        try{
            const pageQuery = query(collectionRef, orderBy(field, order), startAfter(start), limit(pageSize));
            const querySnapshot = await getDocs(pageQuery);
            let items = {};
            let lastElement = null;
            let firstElement = null;

            if(order==='desc'){
                items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse();
                firstElement = querySnapshot.docs[querySnapshot.docs.length - 1];
                lastElement = querySnapshot.docs[0];
            }else{
                items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                lastElement = querySnapshot.docs[querySnapshot.docs.length - 1];
                firstElement = querySnapshot.docs[0];
            }
            
            return {data: items, last: lastElement, first: firstElement};
            } catch (error) {
                console.error("Error fetching page: ", error);
                return [];
            }
        
    }

    export async function addItem(item) {

        let newItem = {};
        try {
         newItem = await addDoc(collection(db, 'productos'), item);
         console.log("Documento creado con ID: ", newItem.id);
            
        } catch (error) {
            console.error("Error al intentar crear el documento: ", error);
        }
        return newItem; 
    }

    export async function loadDB() {
    //    try {
    //     const response = await fetch('/products.json');
    //     if(!response.ok){
    //         throw new Error('Error al cargar el archivo JSON: '+response.status);
    //     }
    //     const data = await response.json();
        const productos = products.products;
        
        try{
            productos.forEach(async (item) => {
                await addItem(item);
            });
        } catch (error) {
            console.error("Error cargando JSON ", error);
        }
    
    }

    export async function updateItem(id, updatedFields) {//updateFileds es un objeto con los campos a actualizar
        const itemRef = doc(db, 'productos', id);
        try {
            await updateDoc(itemRef, updatedFields);
            console.log("Documento actualizado con ID: ", id);
        } catch (error) {
            console.error("Error al actualizar el documento ", error);
        }
    }

    export async function updateItemByName(name, updatedFields) {
        const q = query(collection(db, 'productos'), where('title', '==', name));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log('No se encontraron coincidencias');
            throw new Error("No se encontraron coincidencias");
        }
        const itemRef = querySnapshot.docs[0].id;
        updateItem(itemRef, updatedFields);
    }

    export async function updateMultipleItems(updates) {
        const batch = db.batch();
        updates.forEach(({ id, updatedFields }) => {
            const itemRef = doc(db, 'productos', id);
            batch.update(itemRef, updatedFields);
        });
        try {
            await batch.commit();
            console.log("Lote actualizado correctamente");
        } catch (error) {
            console.error("Error en la actualización: ", error);
        }
    }

    export async function getItemByField(field, value) {
        const q = query(collection(db, 'productos'), where(`${field}`, '==', value));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log('No se encontraron coincidencias');
            return null;
        }
        const item = querySnapshot.docs[0].data();
        console.log('Item encontrado: ', item);
        return item;
    }
 
    export async function getItemById(id) {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            console.log('No se encontraron coincidencias');
            return null;
        }
        console.log('Document ID:', docSnap.id,'Document data:', docSnap.data());
        return {id:docSnap.id, ...docSnap.data()};
    }

    export async function getItemByName(name) {
        const q = query(collection(db, 'productos'), where('title', '==', name));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty){
            console.log('No se encontraron coincidencias.');
            return null;
        }
        const item = {id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data()};
        console.log('Elemento encontrado: ', item);
        return item;
    }

    export async function deleteItem(id) {
        try{
            await deleteDoc(doc(db, 'productos', id));
            console.log(`Elemento ${id} eliminiado exitosamente`);
            return { succes: true, message: `Elemento ${id} eliminiado exitosamente` }
        } catch (error) {
            console.error(error.message);
        }
    }

    export async function clearDB(){
        const collectionRef=collection(db, 'productos');
        const q = query(collectionRef);

        try{
            let snapshot = await getDocs(q);
            let deletedCount = 0;

            while(!snapshot.empty){
                const batch = writeBatch(db);
                snapshot.forEach((item) => {
                    batch.delete(doc(collectionRef, item.id))
                });

                await batch.commit();
                deletedCount += snapshot.size;
                console.log(`Se han eliminado ${snapshot.size} documentos. Total eliminado: ${deletedCount}`);
                snapshot=await getDocs(q);
            }
            if(deletedCount===0){
                console.log('Base de datos actualmente vacía');
            } else {
                console.log(`Base de datos vaciada exitosamente. ${deletedCount} documentos eliminados.`);
            }
        }catch(error){
            console.log(error.message);
            alert('Ha ocurrido un error');
        }
    }