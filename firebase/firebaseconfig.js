// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_Gz931PUmm8UZMdSzL6j4mH4Jy7eRvhg",
  authDomain: "mao-projetc.firebaseapp.com",
  projectId: "mao-projetc",
  storageBucket: "mao-projetc.appspot.com",
  messagingSenderId: "515985720882",
  appId: "1:515985720882:web:cfa61f711ebbbf04545e2b",
  measurementId: "G-YEBT05LNTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// FUNCTION FOR UPLOAD IMAGE IN FIREBASE and get the url for images
const uploadFileToStorage = async (file, destination) => {
  const storageRef = ref(storage, destination);
  const metadata = {
    contentType: "image/png", // Adjust according to your actual file type
  };
  await uploadBytes(storageRef, file.buffer, metadata);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

module.exports = uploadFileToStorage;
