const request = require('request')
const mongodb = require('mongodb')
const assert = require('assert')
const uri = process.env.DB_URL
const Promise = require('promise')

const utils = require('./utils.js')

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var filesUtils = {
  
  "saveNewFile": function(newFile){
    newFile.fileID = ""
    newFile.teamID = ""
    newFile.userID = ""
    mongodb.MongoClient.connect(uri, function(err, client) {
      //if(err) throw err
      var dbCollection = 'remote_files';
      console.log(err)

      var db = client.db('bradslavin');
      db.collection(dbCollection).insert(newFile, function(err, result) {
        if(err) throw err

      })

      client.close(function (err) {
        if(err) throw err
      })
    })
    
  },
  
  "addFileToSlack": function(fileName, fileType, token){
     return new Promise(
      function (resolve, reject) {

        var newFileGUID = utils.createRandomString(8)
        var newFileExternalURL = 'http://rooster.glitch.me/files/'+newFileGUID
        //var newTitle = fileInfo.name

        var data = {
          "token": token,
          "external_id": newFileGUID,
          "external_url": newFileExternalURL,
          "title": fileName,
          "type": fileType
          }

        request.post(
          process.env.SLACK_URL + "/api/files.remote.add",
          {
            form: data
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.add")
              console.log(body)
              resolve(body)
            } else {
              console.log("Fail: files.remote.add")
              console.log(body)
              reject(error)
            }
          }
        )
      })
  },
  
  
  "removeFileFromSlack": function(fileID, token){
    return new Promise(
      function (resolve, reject) {

        var data = {
          "token": token,
          //"external_id": newFileGUID, // option to user external_id
          "file": fileID // Slack fileID
          }
        // https://api.slack.com/methods/files.remote.remove
        request.post(
          process.env.SLACK_URL + "/api/files.remote.remove",
          {
            form: data
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.remove")
              console.log(body)
              resolve(body)
            } else {
              console.log("Fail: files.remote.remove")
              console.log(body)
              reject(error)
            }
          }
        )
      })
    
  },
  
  "getFileInfoFromSlack": function(token, fileID){
    return new Promise(
      function (resolve, reject) {
        var data = {
          "token": token,
          //"external_id": newFileGUID, // option to user external_id
          "file": fileID // Slack fileID
          }
        // https://api.slack.com/methods/files.remote.remove
        request.post(
          process.env.SLACK_URL + "/api/files.remote.info",
          {
            form: data
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.info")
              console.log(body)
              resolve(body)
            } else {
              console.log("Fail: files.remote.info")
              console.log(body)
              reject(error)
            }
          }
        )
      })
    
  },
  
  
  "getFilesFromSlack": function(token, channelID, count, page, tsStart, tsEnd){
    return new Promise(
      function (resolve, reject) {

        var data = {
          "token": token,
          "channel": channelID,
          "count": count,
          "page": page,
          "ts_from": tsStart,
          "ts_to": tsEnd
          }
        // https://api.slack.com/methods/files.remote.remove
        request.post(
          process.env.SLACK_URL + "/api/files.remote.list",
          {
            form: data
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.list")
              console.log(body)
              resolve(body)
            } else {
              console.log("Fail: files.remote.list")
              console.log(body)
              reject(error)
            }
          }
        )
      })

    },
  
    "shareFileInSlack": function(token, channelID, fileID){
      return new Promise(
        function (resolve, reject) {

          var data = {
            "token": token,
            "channel": channelID,
            "file": fileID,
            }
          // https://api.slack.com/methods/files.remote.remove
          request.post(
            process.env.SLACK_URL + "/api/files.remote.share",
            {
              form: data
            },
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log("Success: files.remote.share")
                console.log(body)
                resolve(body)
              } else {
                console.log("Fail: files.remote.share")
                console.log(body)
                reject(error)
              }
            }
          )
        })

      },
  
      "updateFileInSlack": function(token, externalID, externalURL, fileID, preview, title){
        return new Promise(
          function (resolve, reject) {
            var data = {
              "token": token,
              "external_ id": externalID,
              "external_url": externalURL,
              "file": fileID,
              "preview": "",
              "title": title
              }
            // https://api.slack.com/methods/files.remote.remove
            request.post(
              process.env.SLACK_URL + "/api/files.remote.update",
              {
                form: data
              },
              function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  console.log("Success: files.remote.update")
                  console.log(body)
                  resolve(body)
                } else {
                  console.log("Fail: files.remote.update")
                  console.log(body)
                  reject(error)
                }
              }
            )
          })
        }
  
  
}

module.exports = filesUtils