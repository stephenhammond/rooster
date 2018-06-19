var blockOptions = {

	blockSelector: function(input){
    var options = {
      "1": {
        "type": "text",
        "text": "Welcome to the :star:*Best App*:star:! It is the Slack app you're going to write using Block Kit!"
      },
      "2": {
        "type": "image",
        "block_id": "image3",
        "image_url": "https://scontent-sjc3-1.cdninstagram.com/vp/2620ae428ccaf4b3cb2d324baffaddd5/5B9324F4/t51.2885-15/s640x640/sh0.08/e35/30592656_197498221040961_2978205957420482560_n.jpg",
        "alt_text": "cat",
        "caption": "Bubbles, aka Bubsy"
      },
      "3": {
        "type": "context",
        "block_id": "context_123",
        "elements": [
          {
            "type": "image",
            "image_url": "https://image.freepik.com/free-photo/red-drawing-pin_1156-445.jpg",
            "alt_text": "images"
          },
          {
            "type": "text",
            "text": "Location: Dogpatch"
          }
        ]
      },
      "4":{
        "type": "text_group",
        "block_id": "text_collection456",
        "group": [
          {
            "type": "text",
            "text": "Number of La Croix's consumed on Floor 7 on Monday:"
          },
          {
            "type": "text",
            "text": "*187*"
          },
          {
            "type": "text",
            "text": "Number of lines of code committed by Floor 7 on Monday:"
          },
          {
            "type": "text",
            "text": "*1047*"
          }
        ]
      },
      "5":	{
        "type": "action",
        "block_id": "action_123",
        "elements": [
          {
            "type": "button",
            "text": "Click Me",
            "value": "click_me",
            "action_id": "click_me_action_id"
          },
          {
            "type": "datepicker",
            //"placeholder": "choose a date",// waiting for PR
            "action_id": "date_picker"
          },
          {
            "type": "overflow",
            "action_id": "overflow_action_id",
            "options": [
              {
                "text": "Raindrops on roses",
                "value": "raindrops"
              },
              {
                "text": "Whiskers on kittens",
                "value": "whiskers"
              },
              {
                "text": "Bright copper kettles",
                "value": "kettles"
              },
              {
                "text": "Warm woolen mittens",
                "value": "mittens"
              }
            ]
          }
        ]
      },
      "6":{
        "type": "divider"
      },
      "7":{
        "type": "text",
        "text": "<https://google.com|*Haunted House Hotel*> \n :star: \n $20 charge for troll under the stairs \n Rated: 2.4 Horrible",
        "element": {
          "type": "image",
          "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
          "alt_text": "Haunted hotel image"
        }
      },
      "8":{
        "type": "text",
        "text": "*Incident 583* - SEVERE WARNING: nuclear core is melting down.",
        "block_id": "text123",
        "element": {
          "type": "button",
          "text": "Sound Alarm",
          "action_id": "sound_alarm",
          "value": "sound_alarm"
        }
      },
      "9":{
        "type": "text",
        "text": "*Jammie* is requesting an expense approval of *$3,500* for *the Platform Team's Taylor Swift Concert offsite.*",
        "element": {
          "type": "select",
          "action_id": "select_action_id",
          "placeholder": "Select an option",
          "options": [
            {
              "text": "Approve",
              "value": "Approve"
            },
            {
              "text": "Deny",
              "value": "Approve"
            }
          ]
        }
      },
      "10":{
        "type": "text",
        "text": "Your ticket for *A Quiet Place* has been confirmed as purchased for May 17th, 2018 at 10pm.",
        "element": {
          "type": "overflow",
          "action_id": "resolved_issue",
          "options": [
            {
              "text": "Change ticket",
              "value": "change"
            },
            {
              "text": "Cancel ticket",
              "value": "cancel"
            },
            {
              "text": "Invite friends",
              "value": "invite"
            }
          ]
        }
      },
      "11":{
        "type": "text",
        "text": "What night are you available to bust ghosts with Dr. Peter Venkman?",
        "block_id": "text_datepicker456",
        "element": {
          "type": "datepicker",
          "action_id": "ghost_busters",
          "placeholder": "Choose a Date", // waiting for PR
          //"data_source": "date"
        }
      }
    }
    
    
      
    return options[input]
  }
 
  
}

module.exports = blockOptions