

const config = {
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APPID),
    firebaseApiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
    firebaseMessagignSenderId: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
    firebaseDatebaseURL: String(import.meta.env.VITE_FIREBASE_DATABASEURL),
};


export default config;