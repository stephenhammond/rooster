var blockOptions = {
  
  optionsMasterList: function(){
    var optionsList = 
      [
          {
            "label": "Text",
            "value": "1"
          },
          {
            "label": "Image",
            "value": "2"
          },
          {
            "label": "Context",
            "value": "3"
          },
          // {
          //   "label": "Text Group",
          //   "value": "4"
          // },
          {
            "label": "Action",
            "value": "5"
          },
          {
            "label": "Divider",
            "value": "6"
          },
          {
            "label": "Text with Image",
            "value": "7"
          },
          {
            "label": "Text with Button",
            "value": "8"
          },
          {
            "label": "Text with Select",
            "value": "9"
          },
          {
            "label": "Text with Overflow (includes option with link)",
            "value": "10"
          },
          {
            "label": "Text with Datepicker",
            "value": "11"
          },
          {
            "label": "Expandable",
            "value": "12"
          },
          {
            "label": "Datepicker - Aug 1, 2018 preselected",
            "value": "13"
          },
          {
            "label": "Text with users select - no preselected",
            "value": "14"
          },
          {
            "label": "Text with channels select - no preselected",
            "value": "15"
          },
          {
            "label": "Text with conversations select - no preselected",
            "value": "16"
          },
          {
            "label": "Action users select - no preselected",
            "value": "17"
          },
          {
            "label": "Action channels select - no preselected",
            "value": "18"
          },
          {
            "label": "Action conversations select - no preselected",
            "value": "19"
          },
            {
            "label": "Text with users select - user Rooster preselected",
            "value": "20"
          },
          {
            "label": "Text with channels select - #general preselected (test.slack.com only)",
            "value": "21"
          },
          {
            "label": "Text with conversations select - #random preselected (test.slack.com only)",
            "value": "22"
          },
          {
            "label": "Action users select - user Rooster preselected",
            "value": "23"
          },
          {
            "label": "Action channels select - #general preselected (test.slack.com only)",
            "value": "24"
          },
          {
            "label": "Action conversations select - #random preselected (test.slack.com only)",
            "value": "25"
          },
          {
            "label": "Link button",
            "value": "26"
          },
        
        ]
   
    return optionsList
  },

	blockSelector: function(input){
    
    var options = {
      "1": {
        "type": "text",
        "text": "Welcome to the :star:*Best App*:star:! It is the Slack app you're going to write using Block Kit!"
      },
      "2": {
        "type": "image",
        "title": "Sample Title",
        "block_id": "image1",
        "image_url": "http://images.mentalfloss.com/sites/default/files/styles/mf_image_16x9/public/quotesprimary.png?itok=uxSe2My7&resize=1100x619",
        "alt_text": "Bob Ross picture"
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
      // "4":{
      //   "type": "text_group",
      //   "block_id": "text_collection456",
      //   "group": [
      //     {
      //       "type": "text",
      //       "text": "Number of La Croix's consumed on Floor 7 on Monday:"
      //     },
      //     {
      //       "type": "text",
      //       "text": "*187*"
      //     },
      //     {
      //       "type": "text",
      //       "text": "Number of lines of code committed by Floor 7 on Monday:"
      //     },
      //     {
      //       "type": "text",
      //       "text": "*1047*"
      //     }
      //   ]
      //},
      "5":	{
        "type": "actions",
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
            "placeholder": "choose a date",// waiting for PR
            "action_id": "date_picker",
            "selected_date": "2018-08-01"
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
        "block_id": "text_image123",
        "type": "text",
        "text": "<https://google.com|*Haunted House Hotel*> \n :star: \n $20 charge for troll under the stairs \n Rated: 2.4 Horrible",
        "accessory": {
          "type": "image",
          "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
          "alt_text": "Haunted hotel image"
        }
      },
      "8":{
        "type": "text",
        "text": "*Incident 583* - SEVERE WARNING: nuclear core is melting down.",
        "block_id": "text123",
        "accessory": {
          "type": "button",
          "text": "Sound Alarm",
          "action_id": "sound_alarm",
          "value": "sound_alarm"
        }
      },
      "9":{
        "type": "text",
        "text": "*Jammie* is requesting an expense approval of *$3,500* for *the Platform Team's Taylor Swift Concert offsite.*",
        "block_id": "text_select789",
        "accessory": {
          "type": "static_select",
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
        "text": "Issue ABC-123 has been resolved.",
        "block_id": "text_overflow456",
        "accessory": {
          "type": "overflow",
          "action_id": "resolved_issue",
          "options": [
            {
              "text": "Go to Google",
              "value": "google",
              "url": "https://www.google.com/"
              
            },
            {
              "text": "Re-open ticket",
              "value": "open"
            },
            {
              "text": "Send this ticket to...",
              "value": "send"
            }
          ]
        }
      },
      "11":{
        "type": "text",
        "text": "*Sally* has requested you set the deadline for the Nano launch project",
        "block_id": "text_datepicker123",
        "accessory": {
          "type": "datepicker",
          "action_id": "launch_project_date",
          //"selected_date": "2018-08-01"
        }
      },
      "12":{
        "type": "expandable",
        "blocks": [
          {
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
                "placeholder": "choose a date",
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
          }
        ]
      },
      "13":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "datepicker",
            "placeholder": "choose a date",// waiting for PR
            "action_id": "date_picker",
            "selected_date": "2018-08-01"
          }
        ]
      },
      "14":{
        "type": "text",
        "text": "Text with users select menu with no preselected user",
        "block_id": "text_selectasdasd",
        "accessory": {
          "type": "users_select",
          "action_id": "select_action_id"
        }
      },
      "15":{
        "type": "text",
        "text": "Text with channels select menu with no preselected channel",
        "block_id": "text_selectasdaasdsd",
        "accessory": {
          "type": "channels_select",
          "action_id": "select_action_id"
        }
      },
      "16":{
        "type": "text",
        "text": "Text with conversations select menu with no preselected conversation",
        "block_id": "text_selectasdaasdsd",
        "accessory": {
          "type": "conversations_select",
          "action_id": "select_action_id"
        }
      },
      "17":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "users_select",
            "action_id": "users_select",
        
          }
        ]
      },
      "18":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "channels_select",
            "action_id": "channels_select",
        
          }
        ]
      },
      "19":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "conversations_select",
            "action_id": "conversations_select",
        
          }
        ]
      },
      "20":{
        "type": "text",
        "text": "Text with users select menu with preselected user",
        "block_id": "text_selectasdasd",
        "accessory": {
          "type": "users_select",
          "action_id": "select_action_id",
          "selected_user": "UAYPH6EAE"
        }
      },
      "21":{
        "type": "text",
        "text": "Text with channels select menu with reseplected channel",
        "block_id": "text_selectasdaasdsd",
        "accessory": {
          "type": "channels_select",
          "action_id": "select_action_id",
          "selected_channel": "C024BE7TA" // #general on test.slack.com
        }
      },
      "22":{
        "type": "text",
        "text": "Text with conversations select menu with preselected conversation",
        "block_id": "text_selectasdaasdsd",
        "accessory": {
          "type": "conversations_select",
          "action_id": "select_action_id",
          "selected_conversation": "C024BENFU" // #random on test.slack.com
        }
      },
      "23":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "users_select",
            "action_id": "users_select",
            "selected_user": "UAYPH6EAE"  
          }
        ]
      },
      "24":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "channels_select",
            "action_id": "channels_select",
            "selected_channel": "C024BE7TA" // #general on test.slack.com
          }
        ]
      },
      "25":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "conversations_select",
            "action_id": "conversations_select",
            "selected_conversation": "C024BENFU" // #random on test.slack.com
          }
        ]
      },
      "26":	{
        "type": "actions",
        "block_id": "action_123",
        "elements": [
          {
            "type": "button",
            "text": "Google",
            "value": "google",
            "action_id": "click_me_action_id",
            "url": "https://www.google.ca/"
          }
        ]
      }  
    }
    
    
      
    return options[input]
  }
 
  
}

module.exports = blockOptions