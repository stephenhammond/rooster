var messageMenuOptions = {

	menuSelector: function(input,callbackOption){		
		var options = {

			"externalOptionsToBeFiltered": {
			    "options": //[
			        //{
				          //"value": "1",
			            //"label": "Felicia Wolf",
                	//"description": "felicia!!"
			       // },
			       // {
			          //  "value": "2",
			         //   "label": "Welch Wilkerson",
               // 	"description": "Welchie!!"
			      //  },
			      //  {
			          //  "value": "3",
			          //  "label": "Buck Blankenship",
               // 	"description": "Buckster!"
			       // }
	
			     //],
        
        [
           {
              "label":"InRule Technology, Inc.",
              "value":"InRuleTechnology"
           },
           {  
             "label":"Acme Corp",
              "value":"AcmeCorp"
           },
           {
             "label":"Lorm Ipsum",
             "value":"LoremIpsum"
           }
        ]
			    // "option_groups": [
			    // {
			    // "label": "Visual Design",
			    // "options": [
			    // {
			    // "label": "The button color should be artichoke green, not jalapeño",
			    // "value": "UXD-342"
			    // }
			    // ]
			    // },
			    // {
			    // "label": "Front-End Engineering",
			    // "options": [
			    // {
			    // "label": "Remove the marquee tag",
			    // "value": "FE-4597"
			    // },
			    // {
			    // "label": "Too many shades of gray in master CSS",
			    // "value": "FE-238"
			    // }
			     //]
			     //}
    //]
			},

			"conversations": {
				"attachments": [
					{
						"title": "Conversations Menu",
						"text": "This is a Conversations menu",
						"fallback": "Conversations Menu - Fallback",
						//"callback_id": "qa_conversations_menu"+callbackOption,
            "callback_id": callbackOption,
						"color": "#F8E81C",
						"attachment_type": "default",
						"actions": [
							{
								"name": "conversations_test",
								"text": "Choose a Slack conversation",
								"type": "select",
								"data_source": "conversations"
							}
						]
					}
				]
			},

			"external": {
				"attachments": [
					{
						"title": "External Menu",
						"text": "This is a External menu",
						"fallback": "External Menu - Fallback",
						"callback_id": "qa_external_menu"+callbackOption,
						"color": "#BD0FE1",
						"attachment_type": "default",
						"actions": [
							{
								"name": "external_test",
								"text": "Choose an external option",
								"type": "select",
								"data_source": "external",
								"min_query_length": 0
							}
						]
					}
				]
			},

			"channels": {
				"attachments": [
					{
						"title": "Channels Menu",
						"text": "This is a Channels menu",
						"fallback": "Channels Menu - Fallback",
						"callback_id": "qa_channels_menu"+callbackOption,
						"color": "#F6A623",
						"attachment_type": "default",
						"actions": [
							{
								"name": "channels_test",
								"text": "Choose a Slack channel",
								"type": "select",
								"data_source": "channels"
							}
						]
					}
				]
			},

			"users": {
				"attachments": [
					{
						"title": "Users Menu",
						"text": "This is a Users menu",
						"fallback": "Users Menu - Fallback",
						//"callback_id": "qa_users_menu"+callbackOption,
            "callback_id": callbackOption,
						"color": "#50E3C2",
						"attachment_type": "default",
						"actions": [
							{
								"name": "users_test",
								"text": "Choose a teammate",
								"type": "select",
								"data_source": "users",
// 								"selected_options":[
// 										{
										
// 											"value": "U4AB1FRM0"

// 									}]
							}
						]
					}
				]
			},

			"staticGroupsDescriptions": {
				"attachments": [
					{
						"title": "Static Menu",
						"text": "This is a static menu with groups and descriptions",
						"fallback": "Static Menu - Fallback",
						"callback_id": "qa_static_groups_descriptions_menu"+callbackOption,
						"color": "#439FE0",
						"attachment_type": "default",
						"actions": [
							{
								"name": "static_group_desc_test",
								"text": "Choose a static option",
								"type": "select",
                "selected_options":[
										{
											 "label": "Rosalinda Pennington",
										        "value": 1,
										        "description": "rosalindapennington@cosmosis.com"
										    
										    
								}],
								"option_groups": [
									{
										"text": "First Group",
										"options": [
										    {
										        "text": "Rosalinda Pennington",
										        "value": 1,
										        "description": "rosalindapennington@cosmosis.com"
										    },
										    {
										        "text": "Concetta Ross",
										        "value": 2,
										        "description": "concettaross@cosmosis.com"
										    },
										    {
										        "text": "Franks Morris",
										        "value": 3,
										        "description": "franksmorris@cosmosis.com"
										    },
										    {
										        "text": "Jenny Shepherd",
										        "value": 4,
										        "description": "jennyshepherd@cosmosis.com"
										    },
										    {
										        "text": "Priscilla Robertson",
										        "value": 5,
										        "description": "priscillarobertson@cosmosis.com"
										    }
										]
									},{
										"text": "Second Group",
										"options": [
										    {
										        "text": "Jordan Slater",
										        "value": 6,
										        "description": "jordanslater@cosmosis.com"
										    },
										    {
										        "text": "Hardin Acosta",
										        "value": 7,
										        "description": "hardinacosta@cosmosis.com"
										    },
										    {
										        "text": "Schwartz Decker",
										        "value": 8,
										        "description": "schwartzdecker@cosmosis.com"
										    },
										    {
										        "text": "Kari Sloan",
										        "value": 9,
										        "description": "karisloan@cosmosis.com"
										    },
										    {
										        "text": "Baird Steele",
										        "value": 10,
										        "description": "bairdsteele@cosmosis.com"
										    },
										    {
										        "text": "Dionne Coleman",
										        "value": 11,
										        "description": "dionnecoleman@cosmosis.com"
										    },
										    {
										        "text": "Rosanna Bowen",
										        "value": 12,
										        "description": "rosannabowen@cosmosis.com"
										    },
										    {
										        "text": "Jewell Lawrence",
										        "value": 13,
										        "description": "jewelllawrence@cosmosis.com"
										    },
										    {
										        "text": "Pearlie Stephenson",
										        "value": 14,
										        "description": "pearliestephenson@cosmosis.com"
										    }
										]
									},{
										"text": "Third Group",
										"options": [
										    {
										        "text": "Emerson Randolph",
										        "value": 15,
										        "description": "emersonrandolph@cosmosis.com"
										    },
										    {
										        "text": "Workman Pollard",
										        "value": 16,
										        "description": "workmanpollard@cosmosis.com"
										    },
										    {
										        "text": "Love Perez",
										        "value": 17,
										        "description": "loveperez@cosmosis.com"
										    },
										    {
										        "text": "Luisa Arnold",
										        "value": 18,
										        "description": "luisaarnold@cosmosis.com"
										    },
										    {
										        "text": "Miles Haley",
										        "value": 19,
										        "description": "mileshaley@cosmosis.com"
										    },
										    {
										        "text": "Mcfadden Ramsey",
										        "value": 20,
										        "description": "mcfaddenramsey@cosmosis.com"
										    }
										]
									}
								]
							}
						]
					}
				]
			},

			"staticDescriptions": {
				"attachments": [
					{
						"title": "Static Menu",
						"text": "This is a static menu with descriptions",
						"fallback": "Static Menu - Fallback",
						"callback_id": "qa_static_descriptions_menu"+callbackOption,
						"color": "#439FE0",
						"attachment_type": "default",
						"actions": [
							{
								"name": "static_desc_test",
								"text": "Choose a static option",
								"type": "select",
								"options": [
								    {
								        "text": "Rosalinda Pennington",
								        "value": 1,
								        "description": "rosalindapennington@cosmosis.com"
								    },
								    {
								        "text": "Concetta Ross",
								        "value": 2,
								        "description": "concettaross@cosmosis.com"
								    },
								    {
								        "text": "Franks Morris",
								        "value": 3,
								        "description": "franksmorris@cosmosis.com"
								    },
								    {
								        "text": "Jenny Shepherd",
								        "value": 4,
								        "description": "jennyshepherd@cosmosis.com"
								    },
								    {
								        "text": "Priscilla Robertson",
								        "value": 5,
								        "description": "priscillarobertson@cosmosis.com"
								    },
								    {
								        "text": "Jordan Slater",
								        "value": 6,
								        "description": "jordanslater@cosmosis.com"
								    },
								    {
								        "text": "Hardin Acosta",
								        "value": 7,
								        "description": "hardinacosta@cosmosis.com"
								    },
								    {
								        "text": "Schwartz Decker",
								        "value": 8,
								        "description": "schwartzdecker@cosmosis.com"
								    },
								    {
								        "text": "Kari Sloan",
								        "value": 9,
								        "description": "karisloan@cosmosis.com"
								    },
								    {
								        "text": "Baird Steele",
								        "value": 10,
								        "description": "bairdsteele@cosmosis.com"
								    },
								    {
								        "text": "Dionne Coleman",
								        "value": 11,
								        "description": "dionnecoleman@cosmosis.com"
								    },
								    {
								        "text": "Rosanna Bowen",
								        "value": 12,
								        "description": "rosannabowen@cosmosis.com"
								    },
								    {
								        "text": "Jewell Lawrence",
								        "value": 13,
								        "description": "jewelllawrence@cosmosis.com"
								    },
								    {
								        "text": "Pearlie Stephenson",
								        "value": 14,
								        "description": "pearliestephenson@cosmosis.com"
								    },
								    {
								        "text": "Emerson Randolph",
								        "value": 15,
								        "description": "emersonrandolph@cosmosis.com"
								    },
								    {
								        "text": "Workman Pollard",
								        "value": 16,
								        "description": "workmanpollard@cosmosis.com"
								    },
								    {
								        "text": "Love Perez",
								        "value": 17,
								        "description": "loveperez@cosmosis.com"
								    },
								    {
								        "text": "Luisa Arnold",
								        "value": 18,
								        "description": "luisaarnold@cosmosis.com"
								    },
								    {
								        "text": "Miles Haley",
								        "value": 19,
								        "description": "mileshaley@cosmosis.com"
								    },
								    {
								        "text": "Mcfadden Ramsey",
								        "value": 20,
								        "description": "mcfaddenramsey@cosmosis.com"
								    }
								]
							}
						]
					}
				]
			},

			"staticGroups": {
				"attachments": [
					{
						"title": "Static Menu",
						"text": "This is a static menu with groups",
						"fallback": "Static Menu - Fallback",
						"callback_id": "qa_static_groups_menu"+callbackOption,
						"color": "#439FE0",
						"attachment_type": "default",
						"actions": [
							{
								"name": "static_group_test",
								"text": "Choose a static option",
								"type": "select",
								"option_groups": [
									{
										"text": "First Group",
										"options": [
											{
												"text": "Dale Burch",
												"value": 1
											},{
												"text": "Deann Castaneda",
												"value": 2
											},{
												"text": "Mcguire Fitzpatrick",
												"value": 3
											},{
												"text": "Randi Harrison",
												"value": 4
											},{
												"text": "Lindsay Browning",
												"value": 5
											},{
												"text": "Pope Mejia",
												"value": 6
											},{
												"text": "Pansy Morgan",
												"value": 7
											}
										]
									},{
										"text": "Second Group",
										"options": [
											{
												"text": "Matthews Hatfield",
												"value": 8
											},{
												"text": "Margarita Mills",
												"value": 9
											},{
												"text": "Giles Wong",
												"value": 10
											},{
												"text": "Earlene King",
												"value": 11
											}
										]
									},{
										"text": "Third Group",
										"options": [
											{
												"text": "Bell Russo",
												"value": 12
											},{
												"text": "Angelia Osborn",
												"value": 13
											},{
												"text": "Golden Nash",
												"value": 14
											},{
												"text": "Sonya Day",
												"value": 15
											},{
												"text": "Sonia Brooks",
												"value": 16
											},{
												"text": "Yvonne Valdez",
												"value": 17
											},{
												"text": "Colon Whitehead",
												"value": 18
											},{
												"text": "Langley Stevens",
												"value": 19
											},{
												"text": "Kate Hanson",
												"value": 20
											}
										]
									}
								]
							}
						]
					}
				]
			},

			"static": {
				"attachments": [
					{
						"title": "Static Menu",
						"text": "This is a static menu",
						"fallback": "Static Menu - Fallback",
						"callback_id": "qa_static_menu"+callbackOption,
						"color": "#439FE0",
						"attachment_type": "default",
						"actions": [
							{
								"name": "static_test",
								"data_source": "static",
								"text": "Choose a static option please",
								"type": "select",
								"selected_options": [{
									"text": "Dale Burch",
									"value": "1"
								}],
								"confirm": {
			                        "title": "Are you sure?",
			                        "text": "Wouldn't you prefer Pansy Morgan?",
			                        "ok_text": "Yeah!",
			                        "dismiss_text": "No way"
			                    },
								"options": [
                  // 	"confirm": {
									// "title": "Are you sure?",
									// "text": "Wouldn't you prefer a little Pansy Morgan action?",
									// "ok_text": "Yes",
									// "dismiss_text": "No"
									// }
									{
										"text": "Dale Burch",
										"value": 1
									},{
										"text": "Deann Castaneda",
										"value": 2
									},{
										"text": "Mcguire Fitzpatrick",
										"value": 3,
									},{
										"text": "Randi Harrison",
										"value": 4
									},{
										"text": "Lindsay Browning",
										"value": 5
									},{
										"text": "Pope Mejia",
										"value": 6
									},{
										"text": "Pansy Morgan",
										"value": 7
									},{
										"text": "Matthews Hatfield",
										"value": 8
									},{
										"text": "Margarita Mills",
										"value": 9
									},{
										"text": "Giles Wong",
										"value": 10
									},{
										"text": "Earlene King",
										"value": 11
									},{
										"text": "Bell Russo",
										"value": 12
									},{
										"text": "Angelia Osborn",
										"value": 13
									},{
										"text": "Golden Nash",
										"value": 14
									},{
										"text": "Sonya Day",
										"value": 15
									},{
										"text": "Sonia Brooks",
										"value": 16
									},{
										"text": "Yvonne Valdez",
										"value": 17
									},{
										"text": "Colon Whitehead",
										"value": 18
									},{
										"text": "Langley Stevens",
										"value": 19
									},{
										"text": "Kate Hanson",
										"value": 20
									}
								]
							}
						]
					}
				]
			},

			"mention": {
				"text": "@po here's your mention, master"
				
			},
      "paginationMethods": {
				"attachments": [
					{
						"title": "Methods",
						"text": "Test pagination",
						"fallback": "Static Menu - Fallback",
						"callback_id": "pagination_tests",
						"color": "#439FE0",
						"attachment_type": "default",
						"actions": [
							{
								"name": "static_test",
								"data_source": "static",
								"text": "Select a method",
								"type": "select",
								// "confirm": {
								// "title": "Are you sure?",
								// "text": "Wouldn't you prefer Pansy Morgan?",
								// "ok_text": "Yeah!",
								// "dismiss_text": "No way"
								// },
								"options": [
                  // 	"confirm": {
									// "title": "Are you sure?",
									// "text": "Wouldn't you prefer a little Pansy Morgan action?",
									// "ok_text": "Yes",
									// "dismiss_text": "No"
									// }
									{
										"text": "groups.list (no WTA support)",
										"value": 1
									},
                  {
										"text": "mpim.list (no WTA support)",
										"value": 2
									},
                  {
										"text": "files.info",
										"value": 3
									},
                  {
										"text": "reactions.list",
										"value": 4
									},
                  {
										"text": "stars.list (no WTA support)",
										"value": 5
									},
                  {
										"text": "files.list",
										"value": 6
									},
                  {
										"text": "chat.scheduledMessages.list",
										"value": 7
									},
                  {
										"text": "files.remote.list",
										"value": 8
									},
                  
								]
							}
						]
					}
				]
			}				
		}
		return options[input]

	} 
}
module.exports = messageMenuOptions


