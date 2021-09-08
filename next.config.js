const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      images: {
        domains: ["res.cloudinary.com"],
        loader: "imgix",
        path: "",
      },

      env: {
        //mongodb env variables
        mongodb_username: "tobi123",
        mongodb_password: "WhTAyo2vJjU2MHaY",
        mongodb_clustername: "cluster0",
        mongodb_database: "xpress",

        //cloudinary environment variables

        cloudinary_cloud_name: "theoluwatobi",
        cloudinary_api_key: "768418639549973",
        cloudinary_api_secret: "AOEi7V2Nw3drrabdWgqq3mFs2zc",

        //firebase environment variables

        firebase_api_key: "AIzaSyCy9wpehZcFScsjf5hQuTp5l5Nf2nOG-Ig",
        firebase_auth_domain: "xpress-9e7b4.firebaseapp.com",
        firebase_project_id: "xpress-9e7b4",
        firebase_storage_bucket: "xpress-9e7b4.appspot.com",
        firebase_messaging_senderId: "119103869780",
        firebase_app_id: "1:119103869780:web:a0060ecbc9ff79bb916ec1",
      },
    };
  }

  return {
    images: {
      domains: ["res.cloudinary.com"],
      loader: "imgix",
      path: "",
    },

    env: {
      //mongodb env variables
      mongodb_username: "tobi123",
      mongodb_password: "WhTAyo2vJjU2MHaY",
      mongodb_clustername: "cluster0",
      mongodb_database: "xpress",

      //cloudinary environment variables

      cloudinary_cloud_name: "theoluwatobi",
      cloudinary_api_key: "768418639549973",
      cloudinary_api_secret: "AOEi7V2Nw3drrabdWgqq3mFs2zc",

      //firebase environment variables

      firebase_api_key: "AIzaSyCy9wpehZcFScsjf5hQuTp5l5Nf2nOG-Ig",
      firebase_auth_domain: "xpress-9e7b4.firebaseapp.com",
      firebase_project_id: "xpress-9e7b4",
      firebase_storage_bucket: "xpress-9e7b4.appspot.com",
      firebase_messaging_senderId: "119103869780",
      firebase_app_id: "1:119103869780:web:a0060ecbc9ff79bb916ec1",
    },
  };
};
