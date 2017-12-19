# Welcome to Rooster - Card Edition 
=========================

## Intro

**Rooster - Card Edition** is a Slack app that sends a random playing card to a channel or user within your workspace. It uses the following Slack API features:

* Slash Command
* Message Buttons
* Message Menus
* App Unfurl
* Events API
* App Bot

![rooster-card](https://cdn.glitch.com/24ad2fcd-c01f-4f8b-8d35-194d000e2cb4%2Frooster-card-demo.gif?1513646182022)


## Features

### Slash Command and Interactive Message

The `/draw-a-card` slash command will prompt the user to select either a list of users or conversations as the destination of the random card via two interactive buttons. The user then narrows down their choice via a message menu  selection and the card is sent. 

### App Unfurl and Events API

The URL https://rooster.glitch.com is bundled with the app so that if it is included in a message, a random card will be posted to that same channel. The Events API is used to receive `link_shared` events and the app responds using both the `chat.unfurl` API method and a call to `chat.postMessage` with the bot token.  


### Web Interface (BETA)

Experienced at: https://rooster.glitch.me/

You can enter the name of a channel, hit "Send" and a random card is sent. If you enter a name that isn't a channel, nothing happens. 


### Known issues:

* If a duplicate card is sent within a short period of time in the same conversation, the second card will not be displayed. This is a restriction of Slack unfurls. We still love them.
* Selecting yourself will send a message to your Slackbot DM. This is just how Slack handles messages to one's self these days.
* Please send other bug reports or feature requests to sphammond@gmail.com

-------------------


