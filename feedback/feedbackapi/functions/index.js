const functions = require('firebase-functions');


const app = require('express')();


const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // credential: admin.credential.cert(serviceAccount),
    databaseURL: "yourid"
  });

const db = admin.database();

const firebase = require('firebase');

const config = {
    apiKey: "yourid",
    authDomain: "yourid",
    databaseURL: "yourid",
    projectId: "yourid",
    storageBucket: "yourid",
    messagingSenderId: "yourid",
    appId: "yourid",
    measurementId: "yourid"
  };

firebase.initializeApp(config);



const FBAuth = (req,res,next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('no to found')
        return res.status(403).json({error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodeToken => {
            req.user = decodeToken;
            // console.log(decodedToken);

            return admin.database().ref('users').child(req.user.uid)
            .once("value")
        })
        .then(data => {
            
            req.user.username = data.val().username;
            return next();
        })
        .catch(err => {
            console.error('Error while verifying token !',err);
            return res.status(403).json(err);
        })

}

app.get('/posts', (req,res) => {
    db.ref("posts").once("value")
        .then((snapshot) => {
                    return snapshot.val();
                }
        )
        .then((data) => {
            let posts= [];

            Object.values(data).forEach((ref) => {
                posts.push(ref);
            })
            console.log(posts);
            return res.status(200).json(data);
        })
        .catch((err) => console.error(err));
});

app.post('/createposts', FBAuth, (req,res) => {
    var database =  admin.database();
    var rootRef = database.ref('posts');
    var autoId = rootRef.push().key;
    
    var newPost = {
        username: req.user.username,
        message: req.body.message,
        likecount: 0,
        commentcount: 0,
        uid: req.user.uid,
        autoid: autoId,
     };

    rootRef.child(autoId).set(newPost)
        .then(() => {
            const resPost = newPost;
            res.json(resPost);
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        })

});

app.get('/posts/:autoId/likes', FBAuth, (req,res) => {

    const likeDocument = admin.database().ref('likes').child(req.params.autoId)
        .child(req.user.uid);
    
    const postDocument = admin.database().ref(`/posts/${req.params.autoId}`);


    let postData;
    
    postDocument.once("value")
        .then(doc => {
            if(doc) {    
            postData = doc.val();
            // console.log(postData);
            return likeDocument.once("value");
            } else { 
                return res.status(404).json({post:'post not found !'});
            }
    })
    .then(data=> data.val())
    .then (data => {
        // console.log(data.val());
        if(!data) {
            return likeDocument.set({
                username: req.user.username,
            })
            .then(() => {
                postData.likecount++;
                // console.log(postData);
                return postDocument.update({
                    likecount: postData.likecount
                });
            })
            .then(() => {
                return res.json(postData);
            })
        } else {
            return res.status(400).json({error: 'post already liked !'});
        }
    })    
    .catch(err => {
        console.error(err);
        res.status(400).json({error: err.code});
    })

});

app.get('/posts/:autoId/unlikes', FBAuth, (req,res) => {
    // console.log(req.user.uid);
    // console.log(req.user.autoId);
    const likeDocument = admin.database().ref('likes').child(req.params.autoId)
        .child(req.user.uid);
    
    const postDocument = admin.database().ref(`/posts/${req.params.autoId}`);

    let postData;
    
    postDocument.once("value")
        .then(doc => {
            if(doc) {    
            postData = doc.val();
            // console.log(postData);
            return likeDocument.once("value");
            } else { 
                return res.status(404).json({post:'post not found !'});
            }
    })
    .then(data=> data.val())
    .then (data => {
        // console.log(data.val());
        if(!data) {
            return res.status(400).json({error: 'post already liked !'});
        } else {

            return likeDocument.set(null)
            .then(() => {
                postData.likecount--;
                return postDocument.update({
                    likecount: postData.likecount
                });
            })
            .then(() => {
                return res.json(postData);
            })
            
        }
    })    
    .catch(err => {
        console.error(err);
        res.status(400).json({error: err.code});
    })

});


app.post('/signup',(req,res) => {
    const newUser = {
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword,
        username : req.body.username
    }

    
    db.ref(`/users/${newUser.username}`).once("value")
        .then(snapshot => snapshot.val())
        .then(doc => {
            if(doc) {
            return res.status(400).json({username: 'this username is already taken !!'});
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
            
        })
        .then (async data => {
            userid = data.user.uid;
            // console.log(data.user);
            let token = await data.user.getIdToken();
            // data.user.updateProfile({
            //     displayName: newUser.username,    
            // })
            // .then(() => {
                const usersCredentials = {
                email: newUser.email,
                username: newUser.username,
                createdAt:new Date().toISOString(),
                // token,
            };
            db.ref(`/users/${userid}`).set(usersCredentials)
            console.log(token);
            return res.json({token})
            })
        // })
        .catch(err => {
            console.error(err);
            db.ref('error').set(err);
            return res.status(500).json({error: err.code});
        });

});

app.post('/login',(req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
});

// app.post('/signout',(req,res) => {
//     firebase.auth().signOut()
//     .then(() => {
//         // console.log(data);
//         return res.json("user signed out !!")
//     })
//     .catch((e) => {
//         //  console.log(e);
//          return res.json({error: e.code});
//     })
// })




exports.api = functions.region('asia-south1').https.onRequest(app);
