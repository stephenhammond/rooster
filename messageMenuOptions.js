var messageMenuOptions = {

	menuSelector: function(input, callbackID){		
		var options = {
			"conversations": {
				"attachments": [
					{
						"title": "Conversations Menu",
						"text": "This is a Conversations menu",
						"fallback": "Conversations Menu - Fallback",
						"callback_id": callbackID,
						"color": "#F8E81C",
						"attachment_type": "default",
						"actions": [
							{
								"name": "conversations_test",
								"text": "Choose a conversation",
								"type": "select",
								"data_source": "conversations"
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
						"callback_id": callbackID,
						"color": "#50E3C2",
						"attachment_type": "default",
						"actions": [
							{
								"name": "users_test",
								"text": "Choose a teammate",
								"type": "select",
								"data_source": "users"
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


