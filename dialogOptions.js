var menuOptions = require('./messageMenuOptions.js').menuSelector("externalOptionsToBeFiltered","").options
var blockOptionsListForDialog = require('./blockOptions.js').optionsMasterList() 

var dialogOptions = {

	dialogSelector: function(input, stateInput, channelID){		
		var options = {
			"1": {
			   
			  "callback_id": "create_channel",
				// "title": "🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎🌎",
				// "submit_label": "Roostertime!",
				// "elements": [
				 // 	{
			  //   			"type": "textarea", //required
					//    	"label": "Last Name", // required
					//     	"name": "last_name", // required
				 //    		"hint": "hint hint",
				 //    		"max_length": 200, // default 500
				 //    		"min_length": 2,
				 //    		"optional": false,
				 //    		"placeholder": "enter something here",
				 //    		"subtype": "",
				 //    		"value": ""


					// }
					// {"callback_id":"contactsheet|https://esp.gettyimages.com/app/submission_batches/1814383|1814383|https://hooks.slack.com/commands/T0W9H3LAE/271765495217/2OmLDiU6xnS7HTKb4owrKgF9",
				"elements":
					[{
						"label":"Create channel",
           
						"name":"channelName",
						"type":"text",
						"placeholder":"Enter channel name",
						"optional":false,
            //"value": "Does this wrap? Does this wrap? Does this wrap? Does this wrap? Does this wrap? Does this wrap? Does this wrap?"
						"hint":"Channel names can only contain lowercase letters, numbers, hyphens, and underscores, and must be 21 characters or less."
					}],
			   "title":":tada: A really nice app",
				 "submit_label":"Create",
         "notify_on_cancel": true,
         "state": ""

				// ]
			},
			"2": {
			   
			    "callback_id": "simple-dialog-example",
				  "title": "Rooster Dialog Greatness",
				  "elements": [
				 	{
					      "type": "text", //required
					   	  "label": "First Name", //required
					    	"name": "first_name", //required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
                "label": "Additional information",
                "name": "comment1",
                "type": "textarea",
                "hint": "Provide additional information if needed."
          },{
                "label": "Additional information",
                "name": "comment2",
                "type": "textarea",
                "hint": "Provide additional information if needed."
          },
            {
                "label": "Additional information",
                "name": "comment3",
                "type": "textarea",
                "hint": "Provide additional information if needed."
          }
				]
			},
			"3": {
			   
			  "callback_id": "simple-dialog-example",
				"title": "Rooster Dialog Greatness",
				"elements": [
				 	{
					    	"type": "text", //required
					     	"label": "First Name", //required
					    	"name": "first_name", //required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					     	"label": "Last Name", // required
					    	"name": "last_name", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					     	"label": "third field", // required
					    	"name": "third_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					}
				]
			},
			"4": {
			   
			    "callback_id": "simple-dialog-example",
          "notify_on_cancel": true,
				  "title": "Rooster 😎",
				  "elements": [
				 	{
					    	// "type": "text", //required
					    	// "label": "First Name 😎", //required
					    	// "name": "first_name", //required
					    	// "hint": "hint hint",
					    	// "max_length": 4, // default 500
					    	// "min_length": 2,
					    	// "optional": true,
					    	// "placeholder": "enter something here",
					    	// "subtype": "",
					    	// "value": ""
                "type": "select", //required
                "data_source": "users",
					    	"label": "Users", // required
					    	"name": "first", // required
                "hint": "pick a buddy",
                //"value": "U4AB1FRM0"
					},
					{
					    	"type": "text", //required
					     	"label": "Last Name", // required
					    	"name": "last_name", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",// email, number, tel, url FOR MOBILE
				    		"value": ""
					},
					{
					    	"type": "text", //required
					     	"label": "third field", // required
					    	"name": "third_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "Fourth Field", // required
					    	"name": "fourth_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					}
				]
			},
			"5": {
			   
			    "callback_id": "simple-dialog-example",
				  "title": "Custom Dialog",
          "notify_on_cancel": true,
				  "elements": [
				 	{
					    	"type": "select", //required
                "data_source": "users",
					    	"label": "Users", // required
					    	"name": "first", // required
                "hint": "pick a buddy",
                "value": "U4AB1FRM0"
					},
					{
					    	"type": "select", //required
                "data_source": "conversations",
					    	"label": "Conversations", // required
					    	"name": "conversations",
                "value": "C3H4FF94K",
					},
					{
					    	"type": "select", //required
                "data_source": "channels",
					    	"label": "Channels", // required
					    	"name": "Channels",
                "value": "C3H4FF94K",
					},
					{
					    	"type": "select", //required
					   	  //"label": "Fourth Field", // required
                "label": "WWWWWWWWW WWWWWWWWWWW WWWWWWWWW WWWWWWWWWWWWWWWW",
					    	"name": "fourth_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
                "value": "1",
            
                
				    		"option_groups": [

									{
										"label": "First Group",
										"options": [
										    {
										        "label": "Rosalinda Pennington",
										        "value": "1",
										        "description": "rosalindapennington@cosmosis.com"
										    },
										    {
										        "label": "Concetta Ross",
										        "value": "2",
										        "description": "concettaross@cosmosis.com"
										    },
										    {
										        "label": "Franks Morris",
										        "value": "3",
										        "description": "franksmorris@cosmosis.com"
										    },
										    {
										        "label": "Jenny Shepherd",
										        "value": "4",
										        "description": "jennyshepherd@cosmosis.com"
										    },
										    {
										        "label": "Priscilla Robertson",
										        "value": "5",
										        "description": "priscillarobertson@cosmosis.com"
										    }
										],

									},{
										"label": "Second Group",
										"options": [
										    {
										        "label": "Jordan Slater",
										        "value": "6",
										        "description": "jordanslater@cosmosis.com"
										    },
										    {
										        "label": "Hardin Acosta",
										        "value": "7",
										        "description": "hardinacosta@cosmosis.com"
										    },
										    {
										        "label": "Schwartz Decker",
										        "value": "8",
										        "description": "schwartzdecker@cosmosis.com"
										    },
										    {
										        "label": "Kari Sloan",
										        "value": "9",
										        "description": "karisloan@cosmosis.com"
										    },
										    {
										        "label": "Baird Steele",
										        "value": "10",
										        "description": "bairdsteele@cosmosis.com"
										    },
										    {
										        "label": "Dionne Coleman",
										        "value": "11",
										        "description": "dionnecoleman@cosmosis.com"
										    },
										    {
										        "label": "Rosanna Bowen",
										        "value": "12",
										        "description": "rosannabowen@cosmosis.com"
										    },
										    {
										        "label": "Jewell Lawrence",
										        "value": "13",
										        "description": "jewelllawrence@cosmosis.com"
										    },
										    {
										        "label": "Pearlie Stephenson",
										        "value": "14",
										        "description": "pearliestephenson@cosmosis.com"
										    }
										]
									},{
										"label": "Third Group",
										"options": [
										    {
										        "label": "Emerson Randolph",
										        "value": "15",
										        "description": "emersonrandolph@cosmosis.com"
										    },
										    {
										        "label": "Workman Pollard",
										        "value": "16",
										        "description": "workmanpollard@cosmosis.com"
										    },
										    {
										        "label": "Love Perez",
										        "value": "17",
										        "description": "loveperez@cosmosis.com"
										    },
										    {
										        "label": "Luisa Arnold",
										        "value": "18",
										        "description": "luisaarnold@cosmosis.com"
										    },
										    {
										        "label": "Miles Haley",
										        "value": "19",
										        "description": "mileshaley@cosmosis.com"
										    },
										    {
										        "label": "Mcfadden Ramsey",
										        "value": "20",
										        "description": "mcfaddenramsey@cosmosis.com"
										    }
										]
									}
								]

					},
					{
					    	"name": "external_test",
								"label": "External Time",
								"type": "select",
								"data_source": "external",
								"min_query_length": 0, // TEST THIS!
                "selected_options":[
                  {
                    "value": "what",
                    "label": "Preselected Party time"
                  }
                ]
                
          }
				]
			},
			"max": {
			   
			    "callback_id": "simple-dialog-example",
				  "title": "Rooster Dialog Greatness",
          "state": "this_is_the_state",
				  "elements": [
				 	{
					    	"type": "text", //required
					   	  //"label": "This label is 48 characters long... now it is!!!", //required
                "label": "WWWWWWWWW WWWWWWWWWWW WWWWWWWWW WWWWWWWWWWWWWWWW",
					    	"name": "first_name", //required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
                "label": "Last Name", // required
					    	"name": "last_name", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "This label is 48 characters long... now it is!!!", // required
					    	"name": "third_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "Fourth Field", // required
					    	"name": "fourth_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "Fifth Field", // required
					    	"name": "fifth_feild", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "Sixth Field", // required
					    	"name": "sixth_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
          {
					    	"type": "select", //required
                "data_source": "users",
					    	"label": "Users", // required
					    	"name": "first", // required
                "hint": "pick a buddy",
                "value": "U4AB1FRM0"
					},
					{
					    	"type": "select", //required
                "data_source": "conversations",
					    	//"label": "Conversations", // required
                "label": "WWWWWWWWW WWWWWWWWWWW WWWWWWWWW WWWWWWWWWWWWWWWW",
					    	"name": "conversations",
                "value": "C3H4FF94K",
					},
					{
					    	"type": "select", //required
                "data_source": "channels",
					    	"label": "Channels", // required
					    	"name": "Channels",
                "value": "CAY30F2KA",
					},
          {
					    	"type": "select", //required
                "data_source": "channels",
					    	"label": "This label is 48 characters long... now it is!!!", // required
					    	"name": "Channels2",
                "value": "CAY30F2KA"
					},
					 // {
					 //    	"type": "select", //required
					 //      "data_source": "channels",
					 //     	"label": "Channels 3", // required
					 //     	"name": "Channels3",
					 //      "value": "CAY30F2KA"
					 // }
				]
			},
      "state": {
			   
			    "callback_id": "simple-dialog-example",
				  "title": "Rooster Dialog Greatness",
          "notify_on_cancel": true,
          "state": stateInput,
				  "elements": [
				 	{
					    	"type": "text", //required
					   	  "label": "First Name", //required
					    	"name": "first_name", //required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
                "label": "Last Name", // required
					    	"name": "last_name", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "third field", // required
					    	"name": "third_field", // required
				    		"hint": "hint hint",
				    		"max_length": 4, // default 500
				    		"min_length": 2,
				    		"optional": false,
				    		"placeholder": "enter something here",
				    		"subtype": "",
				    		"value": ""
					},
          {
            "name": "external_test",
            "label": "External Time",
            "type": "select",
            "data_source": "external",
            "min_query_length": 1, // TEST THIS!
            "selected_options":[
              {
                "value": "what",
                "label": "Preselected Party time"
              }
            ]
                
          }
				]
			},
      
      
      "blocks": {
			   
			    "callback_id": "blocks",
				  "title": "Create Block Kit Message",
          "notify_on_cancel": true,
          "state": stateInput,
				  "elements": [
            {
                "label": "Block 1",
                "type": "select",
                "name": "block_1",
                "optional": true,
                "options": blockOptionsListForDialog
            },
            {
                "label": "Block 2",
                "type": "select",
                "name": "block_2",
                "optional": true,
                "options": blockOptionsListForDialog
            },
            {
              "label": "Block 3",
              "type": "select",
              "name": "block_3",
              "optional": true,
              "options": blockOptionsListForDialog
            },
            {
              "label": "Block 4",
              "type": "select",
              "name": "block_4",
              "optional": true,
              "options": blockOptionsListForDialog
            },
            {
              "label": "Block 5",
              "type": "select",
              "name": "block_5",
              "optional": true,
              "options": blockOptionsListForDialog
            },
            //  {
            //     "label": "Block 6",
            //     "type": "select",
            //     "name": "block_6",
            //     "optional": true,
            //     "options": blockOptionsListForDialog
            // },
            // {
            //   "label": "Block 7",
            //   "type": "select",
            //   "name": "block_7",
            //   "optional": true,
            //   "options": blockOptionsListForDialog
            // },
            // {
            //   "label": "Block 8",
            //   "type": "select",
            //   "name": "block_8",
            //   "optional": true,
            //   "options": blockOptionsListForDialog
            // },
            // {
            //   "label": "Block 9",
            //   "type": "select",
            //   "name": "block_9",
            //   "optional": true,
            //   "options": blockOptionsListForDialog
            // }
          ]
      },
      "filesList": {
			   
			    "callback_id": "filesListDialog",
				  "title": "Search Rooster Files",
				  "elements": [
          {
					    	"type": "text", //required
					   	  "label": "Channel", //required
					    	"name": "channelIDSearch", //required
				    	//	"hint": "hint hint",
				    		//"max_length": 4, // default 500
				    		//"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter channel ID",
				    		"subtype": "",
				    		"value": "" 
					},
				 	{
					    	"type": "text", //required
					   	  "label": "TS Start", //required
					    	"name": "tsStart", //required
				    	//	"hint": "hint hint",
				    		//"max_length": 4, // default 500
				    		//"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter TS in seconds",
				    		"subtype": "",
				    		"value": new Date() / 1000 | 0 // current time in seconds 
					},
					{
					    	"type": "text", //required
                "label": "TS End", // required
					    	"name": "tsEnd", // required
				    	//	"hint": "hint hint",
				    		//"max_length": 4, // default 500
				    		//"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter TS in seconds",
				    		"subtype": "",
				    		"value": new Date() / 1000 | 0 // current time in seconds
					},
					{
					    	"type": "text", //required
					   	  "label": "Page", // required
					    	"name": "listPage", // required
				    		//"hint": "hint hint",
				    	//	"max_length": 4, // default 500
				    	//	"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter page here",
				    		"subtype": "",
				    		"value": ""
					},
					{
					    	"type": "text", //required
					   	  "label": "Count", // required
					    	"name": "listCount", // required
				    		//"hint": "hint hint",
				    	//	"max_length": 4, // default 500
				    	//	"min_length": 2,
				    		"optional": true,
				    		"placeholder": "enter count here",
				    		"subtype": "",
				    		"value": ""
					}
        ]
      },
      "scheduled": {
        "callback_id": "scheduled_message",
        "title": "Schedule a message",
        "notify_on_cancel": true,
        "state": stateInput,
        "elements": [
          {
            "type": "select",
            "name": "timeOffset",
            "label": "Send message in ...",
            "options": [
              {
                "value": "60",
                "label": "1 minute"
              },
              {
                "value": "300",
                "label": "5 minutes"
              },
              {
                "value": "1800",
                "label": "30 minutes"
              },
              {
                "value": "9000",
                "label": "2.5 hours"
              },
              {
                "value": "10540000",
                "label": "122 days"
              },
              {
                "value": "5",
                "label": "5 seconds"
              },
              {
                "value": "-60",
                "label": "-1 minute"
              },
               {
                "value": "10280000",
                "label": "119 days"
              },
              
              
            ]
          },
          {
            "type": "select", //required
            "data_source": "conversations",
            "label": "Choose where to send the message", // required
            "name": "conversationScheduled",
            "value": channelID
          },
        ]
      }
		}
    //console.log(blockOptionsListForDialog)
		return options[input]

	} 
}
module.exports = dialogOptions


