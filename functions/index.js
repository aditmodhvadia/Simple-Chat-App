const functions = require('firebase-functions');
const admin = require('firebase-admin')
const BadWordsFilter = require('bad-words');

admin.initializeApp()
const db = admin.firestore()

exports.determineExplicitContent = functions.firestore.document('chatRooms/{roomId}/messages/{msgId}').onCreate(async (doc, context) => {
    const filter = new BadWordsFilter()

    const { text, uid, createdAt } = doc.data()
    if (filter.isProfane(text)) {
        const cleanText = filter.clean(text)
        await doc.ref.update({ text: `I got banned for using profanity: ${cleanText}` })

        const userEmail = (await admin.auth().getUser(uid)).email;
        await db.collection('bannedUsers').doc(uid).set({
            email: userEmail
        })
    } else {
        // update the last msg on the chat room
        await db.collection("chatRooms").doc(context.params.roomId).update({
            lastMsg: {
                text,
                createdAt,
                uid
            }
        })
    }
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
