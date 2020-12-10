# Simple React Chat application

This is chat application built using React, Firebase and MaterialUI.

## Live deployment

https://simple-chat-app-6d88e.web.app/

## Running Locally with docker

1. Build a custom image from the DockerFile

```shell
docker build --tag adit-modhvadia-project .
```

1. Run the custom built image file

```shell
docker run -p 3000:3000 adit-modhvadia-project
```

1. Open localhost:3000 in your browser

### Intention

The need for such an application arises whenever a group of people might wanna discuss something quickly but would need to set up a slack workspace, or a discord server.
Instead by using Simple Chat application everyone can quickly join the conversation and not worry about deleting their messages.

### Features

- [x] Users can login using their Google accounts or facebook and can view all the chat rooms present.
- [x] Users can send messages to the chat rooms.
- [x] Users receive messages from others almost instantly.
- [x] Users can see the name and profile image of the user who sent the message.
- [x] Users can sign in and sign out of the application.
- [x] Users can create new chat rooms.
- [x] Messages with profanity or explicit content are filtered.
- [x] Users who send messages with profanity or explicit content will be banned from the chat room. (Low Priority)
- [x] Users can see the last message sent in a chat room. (Low Priority)
- [ ] User can set the time to live for the messages of a new chat room. (Low Priority)
