import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

    apiKey: "AIzaSyDluwG7gy5HjvBeSC_YM0MI_YroRm8gSNI",

    authDomain: "product-4bf41.firebaseapp.com",

    projectId: "product-4bf41",

    storageBucket: "product-4bf41.appspot.com",

    messagingSenderId: "878207453382",

    appId: "1:878207453382:web:8288e47c96035d37d62fc7",

    measurementId: "G-1B30XYE0JG"

};


export const app = initializeApp(firebaseConfig);

export const db = getAnalytics(app);








