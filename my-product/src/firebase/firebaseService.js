import { db, app } from "./config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

class firebaseService {

    storage = null
    constructor() {
        this.storage = getStorage(app);
    }
    multi_image_upload = async (Image) => {
        try {
            const ImageUrl = [];
            if (Image.length > 0) {
                for (let i = 0; i < Image.length; i++) {
                    const name = Image[i].name + Date.now();
                    const storageRef = ref(this.storage, `/image/${name}`);
                    const uploadTask = await uploadBytesResumable(storageRef, Image[i]);
                    const url = await getDownloadURL(uploadTask.ref);
                    ImageUrl.push({ src: url })
                }

                await addDoc(collection(db, 'product'), {
                    Image: ImageUrl,
                    name: 'Farid'
                })
                return { sucess: 'Single image upload sucess' }
            } else {
                return { error: 'Please provide your Image' }
            }
        } catch (error) {
            return { error: 'multi image upload and store link fail' }
        }
    }



    single_image_upload = async (Image) => {
        try {
            const name = Image.name + Date.now();
            if (name) {
                const storageRef = ref(this.storage, `/image/${name}`);
                const uploadTask = await uploadBytesResumable(storageRef, Image);
                const url = await getDownloadURL(uploadTask.ref);

                await addDoc(collection(db, 'product1'), {
                    Image: url,
                    name: 'Farid'
                })
                return { sucess: 'Single image upload sucess' }

            } else {
                return { error: 'Please provide your image' }
            }
        } catch (error) {
            return { error: 'Single image upload and store link fail' }

        }
    }




    get_multi_image = async () => {
        try {
            let multiImage = [];
            const refarence = collection(db, 'product');
            const imageArray = await getDocs(refarence);
            imageArray.forEach(doc => {
                multiImage = [...multiImage, { id: doc.id, ...doc.data() }]
            })
            return multiImage
        } catch (error) {
        }
    }



    get_single_image = async () => {
        try {
            let SingleImage = [];
            const refarence = collection(db, 'product1');
            const imageArray = await getDocs(refarence);
            imageArray.forEach(doc => {
                SingleImage = [...SingleImage, { id: doc.id, ...doc.data() }]
            })
            return SingleImage
        } catch (error) {

        }
    }



    // fonction pour supprimer une seule image
    delete_single_image = async (img) => {
        try {
            const deleteRef = ref(this.storage, img.image);
            await deleteObject(deleteRef);

            const docRef = doc(db, 'product1', img.id)
            await deleteDoc(docRef)
            return { sucess: 'Single image delete sucess' }
        } catch (error) {
            return { error: 'image delete fail' }

        }
    }


    // fonction pour supprimer plusieurs images au même moment
    delete_multi_image = async (img) => {
        try {

            for (let i = 0; i < img.image.length; i++) {
                const deleteRef = ref(this.storage, img.image[i].src);
                await deleteObject(deleteRef);
            }
            const docRef = doc(db, 'product', img.id)
            await deleteDoc(docRef)
            return { sucess: 'multi image delete sucess' }
            

        } catch (error) {
            return { error: 'image delete fail' }

        }
    }

}





export default  firebaseService();


























