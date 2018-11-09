var blockOptions = {
  
  optionsMasterList: function(){
    var optionsList = 
      [
        {
          "label": "Section with text markdown",
          "value": "1"
        },
        {
          "label": "Section with plaintext",
          "value": "1a"
        },
        {
          "label": "Section with fields",
          "value": "1b"
        },
        {
          "label": "Image",
          "value": "2"
        },
        {
          "label": "Context",
          "value": "3"
        },
        {
          "label": "Action buttons",
          "value": "4"
        },
        {
          "label": "Divider",
          "value": "5"
        },
        {
          "label": "Section with Image",
          "value": "6"
        },
        {
          "label": "Section with Button",
          "value": "7"
        },
        {
          "label": "Section with Select",
          "value": "8"
        },
        {
          "label": "Section with Overflow",
          "value": "9"
        },
        {
          "label": "Section with Datepicker - 1990-04-28 preselected",
          "value": "10"
        },
        //{
         // "label": "Expandable",
         // "value": "11"
        //},
        {
          "label": "Datepicker, overflow and button",
          "value": "12"
        },
        {
          "label": "Static Select with button",
          "value": "12a"
        },
        {
          "label": "Section with users select - no preselected",
          "value": "13"
        },
        {
          "label": "Section with channels select - no preselected",
          "value": "14"
        },
        {
          "label": "Section with conversations select - no preselected",
          "value": "15"
        },
        {
          "label": "Action users select - no preselected",
          "value": "16"
        },
        {
          "label": "Action channels select - no preselected",
          "value": "17"
        },
        {
          "label": "Action conversations select - no preselected",
          "value": "18"
        },
          {
          "label": "Section w/ users select - user Rooster preselected",
          "value": "19"
        },
        {
          "label": "Section w/ channels select - #general preselected (test.slack.com only)",
          "value": "20"
        },
        {
          "label": "Section w/ conversations select - #random preselected (test.slack.com only)",
          "value": "21"
        },
        {
          "label": "Action users select - user Rooster preselected",
          "value": "22"
        },
        {
          "label": "Action channels select - #general preselected (test.slack.com only)",
          "value": "23"
        },
        {
          "label": "Action conversations select - #random preselected (test.slack.com only)",
          "value": "24"
        },
        {
          "label": "Link button",
          "value": "25"
        },

      ]
   
    return optionsList
  },

	blockSelector: function(input){
    
    var options = {
      "1": {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Markdown samples: *bold* _italic_ ~strikethrough~ `code` :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>, dated <!date^1392734382^Posted {date_num} {time_secs}>"
        }
      },
      "1a": {
        "type": "section",
        "text": {
          "type": "plaintext",
          "text": "Plaintext: *bold* _italic_ ~strikethrough~ `code`"
        }
      },
       "1b": {
        "type": "section",
        "block_id": "section789",
        "fields": [
          {
            "type": "plaintext",
            "text": "*this is plaintext text*"
          },
          {
            "type": "plaintext",
            "text": "*this is plaintext text*"
          },
          {
            "type": "plaintext",
            "text": "*this is plaintext text*"
          },
          {
            "type": "plaintext",
            "text": "*this is plaintext text*"
          },
          {
            "type": "plaintext",
            "text": "*this is plaintext text*"
          }
        ]
      },
      "2": {
       	"type": "image",
        "title": {
          "type": "plaintext",
          "text": "Catch That Baby"
        },
        "block_id": "image123",
        "image_url": "https://images.pexels.com/photos/1166990/pexels-photo-1166990.jpeg",
        "alt_text": "baby_catchin"
      },
      "3": {
        "type": "context",
        "block_id": "context456",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "*This* is :smile: markdown"
          },
          {
            "type": "image",
            "image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
            "alt_text": "cute cat"
          }
        ]
      },
      "4":	{
        "type": "actions",
        "block_id": "actionblock123",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plaintext",
              "text": "red"
            },
            "value": "red",
            "action_id": "button"
          },
          {
            "type": "button",
            "text": {
              "type": "plaintext",
              "text": "blue"
            },
            "value": "blue",
            "action_id": "button2"
          },
          {
            "type": "button",
            "text": {
              "type": "plaintext",
              "text": "green"
            },
            "value": "green",
            "action_id": "button3"
          }
        ]
      },
      "5":{
        "type": "divider"
      },
      "6":{
        "type": "section",
        "block_id": "section567",
        "text": {
          "type": "mrkdwn",
          "text": "This is a section block with an accessory image."
        },
        "accessory": {
          "type": "image",
          "image_url": "https://pbs.twimg.com/profile_images/625633822235693056/lNGUneLX_400x400.jpg",
          "alt_text": "cute cat"
        }
      },
      "7":{
        "type": "section",
        "block_id": "section234",
        "text": {
          "type": "mrkdwn",
          "text": "This is a section block with a button."
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plaintext",
            "text": "Click Me"
          },
          "value": "click_me_123",
          "action_id": "button"
        }
      },
      "8":{
       "type": "section",
        "block_id": "section678",
        "text": {
          "type": "mrkdwn",
          "text": "Pick an item from the dropdown list"
        },
        "accessory": {
          "action_id": "text1234",
          "type": "static_select",
          "placeholder": {
            "type": "plaintext",
            "text": "Select an item"
          },
          "options": [
            {
              "text": {
                "type": "plaintext",
                "text": "0 - *this is plaintext text*"
              },
              "value": "value-0"
            },
            {
              "text": {
                "type": "plaintext",
                "text": "1 - *this is plaintext text*"
              },
              "value": "value-1"
            },
            {
              "text": {
                "type": "plaintext",
                "text": "2 - *this is plaintext text*"
              },
              "value": "value-2"
            }
          ]
        }
      },
      "9":{
        "type": "section",
        "block_id": "section 890 asdfasdf",
        "text": {
          "type": "mrkdwn",
          "text": "This is a section block with an overflow menu."
        },
        "accessory": {
          "type": "overflow",
          "options": [
            {
              "text": {
                "type": "plaintext",
                "text": "*this is plaintext text*"
              },
              "value": "value-0"
            },
            {
              "text": {
                "type": "plaintext",
                "text": "*this is plaintext text*"
              },
              "value": "value-1"
            },
            {
              "text": {
                "type": "plaintext",
                "text": "*this is plaintext text*"
              },
              "value": "value-2"
            },
            {
              "text": {
                "type": "plaintext",
                "text": "*this is plaintext text*"
              },
              "value": "value-3"
            },
            {
              "text": {
                "type": "plaintext",
                "text": "*this is plaintext text*"
              },
              "value": "value-4"
            }
          ],
          "action_id": "overflowasdfasdfasdf"
        }
      },
      "10":{
        "type": "section",
        "block_id": "section1234",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a date for the deadline."
        },
        "accessory": {
          "type": "datepicker",
          "action_id": "datepicker123asdfasdfasdcghj",
          "initial_date": "1990-04-28",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a date"
          }
        }
      },
      //"11":{
    //    "type": "text",
    //    "text": "placeholder for expandable type"
    //    },
      //   "type": "expandable",
      //   "blocks": [
      //     {
      //       "type": "action",
      //       "block_id": "action_123",
      //       "elements": [
      //         {
      //           "type": "button",
      //           "text": "Click Me",
      //           "value": "click_me",
      //           "action_id": "click_me_action_id"
      //         },
      //         {
      //           "type": "datepicker",
      //           "placeholder": "choose a date",
      //           "action_id": "date_picker"
      //         },
      //         {
      //           "type": "overflow",
      //           "action_id": "overflow_action_id",
      //           "options": [
      //             {
      //               "text": "Raindrops on roses",
      //               "value": "raindrops"
      //             },
      //             {
      //               "text": "Whiskers on kittens",
      //               "value": "whiskers"
      //             },
      //             {
      //               "text": "Bright copper kettles",
      //               "value": "kettles"
      //             },
      //             {
      //               "text": "Warm woolen mittens",
      //               "value": "mittens"
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // },
      "12":	{
        "type": "actions",
        "block_id": "actionblock789dfghjdfgj",
        "elements": [
          {
            "type": "datepicker",
            "action_id": "datepicker123asdfasdfasdfh",
            //"initial_date": "1990-04-28",
            "placeholder": {
              "type": "plaintext",
              "text": "Select a date"
            }
          },
          {
            "type": "overflow",
            "options": [
              {
                "text": {
                  "type": "plaintext",
                  "text": "*this is plaintext text*"
                },
                "value": "value-0"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "*this is plaintext text*"
                },
                "value": "value-1"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "*this is plaintext text*"
                },
                "value": "value-2"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "*this is plaintext text*"
                },
                "value": "value-3"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "*this is plaintext text*"
                },
                "value": "value-4"
              }
            ],
            "action_id": "overflowasdfasdfasdf"
          },
          {
            "type": "button",
            "text": {
              "type": "plaintext",
              "text": "Click Me"
            },
            "value": "click_me_123",
            "action_id": "buttonfghjseadraer"
          }
        ]
      },
      "12a": {
        "type": "actions",
        "block_id": "actions1fdgji",
        "elements": [
          {
            "type": "static_select",
            "placeholder":{
              "type": "plaintext",
              "text": "Which witch is the witchiest witch?"
            },
            "action_id": "select_2asdfasdf",
            "options": [
              {
                "text": {
                  "type": "plaintext",
                  "text": "Matilda"
                },
                "value": "matilda"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "Glinda"
                },
                "value": "glinda"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "Granny Weatherwax"
                },
                "value": "grannyWeatherwax"
              },
              {
                "text": {
                  "type": "plaintext",
                  "text": "Hermione"
                },
                "value": "hermione"
              }
            ]
          },
          {
            "type": "button",
            "text": {
              "type": "plaintext",
              "text": "Cancel"
            },
            "value": "cancel",
            "action_id": "button_1fghjfghj"
          }
        ]
      },
      "13":{
        "type": "section",
        "block_id": "section678asdfasdfasdf",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a *user* from the dropdown list"
        },
        "accessory": {
          "action_id": "textadfhfghj",
          "type": "users_select",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a user"
          }
        }
      },
      "14":{
        "type": "section",
        "block_id": "section678asdfasdf",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a *channel* from the dropdown list"
        },
        "accessory": {
          "action_id": "text1adfgadfg",
          "type": "channels_select",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a channel"
          }
        }
      },
      "15":{
        "type": "section",
        "block_id": "section678sdfgsdfg",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a *conversation* from the dropdown list"
      },
        "accessory": {
          "action_id": "text2345ghksdf",
          "type": "conversations_selectfghjfghj",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a conversation"
          }
        }
      },
      "16":	{
        "type": "actions",
        "block_id": "action_123asdfasdf",
        "elements": [
          {
            "type": "users_select",
            "action_id": "users_selectfghjubas",
            "placeholder": {
              "type": "plaintext",
              "text": "Select a user"
            }
          }
        ]
      },
      "17":	{
        "type": "actions",
        "block_id": "action_123asdgadhfasfdg",
        "elements": [
          {
            "type": "channels_select",
            "action_id": "channels_selectfghjertxvhj",
            "placeholder": {
              "type": "plaintext",
              "text": "Select a channel"
            }
          }
        ]
      },
      "18":	{
        "type": "actions",
        "block_id": "action_123asdgasdf",
        "elements": [
          {
            "type": "conversations_select",
            "action_id": "conversations_selectfghjffasdar",
            "placeholder": {
              "type": "plaintext",
              "text": "Select a conversation"
            }
          }
        ]
      },
      "19":{
        "type": "section",
        "block_id": "users2",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a *user* from the dropdown list"
        },
        "accessory": {
          "action_id": "text1234asdfastw",
          "type": "users_select",
          "initial_user": "UAYPH6EAE",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a user"
          }
        }
      },
      "20":{
        "type": "section",
        "block_id": "channels2thywdfasf",
        "text": {
          "type": "mrkdwn",
          "text": "Pick a *channel* from the dropdown list"
        },
        "accessory": {
          "action_id": "text1234asdgafhasd",
          "type": "channels_select",
          "initial_channel": "C024BE7TA",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a channel"
          }
        }
      },
      "21":{
        "type": "section",
        "block_id": "convos2dfhsdfassd",
        "text": {
            "type": "mrkdwn",
            "text": "Pick a *conversation* from the dropdown list"
        },
        "accessory": {
          "action_id": "text1234asdgaesdhhjadfg",
          "type": "conversations_select",
          "initial_conversation": "C024BENFU",
          "placeholder": {
            "type": "plaintext",
            "text": "Select a conversation"
          }
        }
      },
      "22":	{
        "type": "actions",
        "block_id": "action_123asdsdgadfha",
        "elements": [
          {
            "type": "users_select",
            "action_id": "users_selectasdfasdga",
            "initial_user": "UAYPH6EAE",
            "placeholder": {
              "type": "plaintext",
              "text": "Select a conversation"
            }
          }
        ]
      },
      "23":	{
        "type": "actions",
        "block_id": "action_123gjhwer",
        "elements": [
          {
            "type": "channels_select",
            "action_id": "channels_selectasdfasdf",
            "initial_channel": "C024BE7TA", // #general on test.slack.com
            "placeholder": {
              "type": "plaintext",
              "text": "Select a channel"
            }
          }
        ]
      },
      "24":	{
        "type": "actions",
        "block_id": "action_123fghjvcber",
        "elements": [
          {
            "type": "conversations_select",
            "action_id": "conversations_selectsdgsdferja",
            "initial_conversation": "C024BENFU", // #random on test.slack.com
            "placeholder": {
              "type": "plaintext",
              "text": "Select a conversation"
            }
          }
        ]
      },
      "25":	{
        "type": "actions",
        "block_id": "actions1rtycxbvsadf",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plaintext",
              "text": "The Google"
            },
            "url": "https://www.google.com/"
          }
        ]
      },
      "26":{
        "type": "text",
        "text": "select a conversation",
        "block_id": "filesearch_conversations",
        "accessory": {
          "type": "conversations_select",
          "action_id": "filesearch_conversations"
        }
      },
      "27":{
        "type": "text",
        "text": "Count",
        "block_id": "filesearch_count",
        "accessory": {
          "type": "static_select",
          "action_id": "filesearch_count",
          "placeholder": "Select a count",
          "options": [
            {
              "text": "1",
              "value": "1"
            },
            {
              "text": "2",
              "value": "2"
            },
            {
              "text": "4",
              "value": "4"
            },
            {
              "text": "8",
              "value": "8"
            }
          ]
        }
      },
      "28":{
        "type": "text",
        "text": "Page",
        "block_id": "filesearch_page",
        "accessory": {
          "type": "static_select",
          "action_id": "filesearch_page",
          "placeholder": "Select a page",
          "options": [
            {
              "text": "1",
              "value": "1"
            },
            {
              "text": "2",
              "value": "2"
            },
            {
              "text": "3",
              "value": "4"
            },
            {
              "text": "4",
              "value": "4"
            }
          ]
        }
      },
      "29":{
        "type": "text",
        "text": "From",
        "block_id": "filesearch_tsfrom",
        "accessory": {
          "type": "datepicker",
          "action_id": "filesearch_tsfrom",
        }
      },
      "30":{
        "type": "text",
        "text": "To",
        "block_id": "filesearch_tsto",
        "accessory": {
          "type": "datepicker",
          "action_id": "filesearch_tsto",
        }
      },
    }
    
    
      
    return options[input]
  }
 
  
}

module.exports = blockOptions