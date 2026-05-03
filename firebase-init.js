/* Firebase Configuration and Initialization */
(function() {
  'use strict';

  var firebaseConfig = {
    apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "project-f5565ebc-3db6-4527-9e7.firebaseapp.com",
    projectId: "project-f5565ebc-3db6-4527-9e7",
    storageBucket: "project-f5565ebc-3db6-4527-9e7.appspot.com",
    messagingSenderId: "796138804129",
    appId: "1:796138804129:web:election-mentor-ai"
  };

  try {
    var app = firebase.initializeApp(firebaseConfig);
    window.firebaseApp = app;
    window.firebaseAuth = firebase.auth();
    window.firebaseDb = firebase.firestore();
    window.firebaseAnalytics = firebase.analytics();
  } catch(e) {
    console.warn('Firebase initialization skipped:', e.message);
  }
})();
