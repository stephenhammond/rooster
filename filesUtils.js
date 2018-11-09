const request = require('request')
const mongodb = require('mongodb')
const assert = require('assert')
const uri = process.env.DB_URL
const Promise = require('promise')

const utils = require('./utils.js')
const base64Img = require('base64-img')
const fs = require('fs')

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var filesUtils = {
  
  "saveNewFile": function(newFile, slackFileData, teamID, extID){
    newFile.slackFileData = slackFileData
    newFile.teamID = teamID
    newFile.externalID = extID
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
  
  "addFileToSlack": function(fileName, fileType, token, userID, isPreview){
     return new Promise(
      function (resolve, reject) {

        var newFileGUID = utils.createRandomString(8)
        var newFileExternalURL = 'http://rooster.glitch.me/file_viewer?id='+newFileGUID
        //var newTitle = fileInfo.name
        var previewData = ""
        if (isPreview){
          previewData = fs.createReadStream('./assets/temp.jpg')
        }
        var data = {
          "token": token,
          "external_id": newFileGUID,
          "external_url": newFileExternalURL,
          "title": fileName,
          "type": fileType,
          "preview": previewData
          
          }

        request({
          url: process.env.SLACK_URL + "/api/files.remote.add",
          formData: data,
          headers: { "X-Slack-User": userID},
          method: 'POST'
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.add")
              console.log(body)
              resolve(JSON.parse(body).file)
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
              resolve(JSON.parse(body))
            } else {
              console.log("Fail: files.remote.remove")
              console.log(body)
              resolve(JSON.parse(body))
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
  
  
  "getFilesFromSlack": function(token, channelID, count, page, tsStart, tsEnd){//, count, page, tsStart, tsEnd){
    return new Promise(
      function (resolve, reject) {
        console.log(count)
        var data = {
          "token": token,
          "channel": channelID,
          "count": count,
          "page": page,
          "ts_from": tsStart,
          "ts_to": tsEnd
          }
        console.log(data)
        request.post(
          process.env.SLACK_URL + "/api/files.remote.list",
          {
            form: data
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.list")
              //console.log(body)
              resolve(JSON.parse(body))
            } else {
              console.log("Fail: files.remote.list")
              console.log(body)
              reject(error)
            }
          }
        )
      })

    },
  
    "shareFileInSlack": function(token, channelID, fileID, userID){
      return new Promise(
        function (resolve, reject) {

          var data = {
            "token": token,
            "channel": channelID,
            "file": fileID,
          }
          
        request({
          url: process.env.SLACK_URL + "/api/files.remote.share",
          form: data,
          headers: { "X-Slack-User": userID},
          method: 'POST'
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log("Success: files.remote.share")
              console.log(body)
              resolve(JSON.parse(body).file)
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
                resolve(body)
              }
            }
          )
        })
      },
      getAllFilesForTeam: function(teamID){
        return new Promise(
          function (resolve, reject) {
            mongodb.MongoClient.connect(uri, function(err, client) {
              if(err) reject(err)
              var db = client.db('bradslavin')
              db.collection('remote_files').find({teamID: teamID}).toArray(function(err, doc) {
                assert.equal(err, null)
                console.log("Success: ")
                console.dir(doc)
                resolve(doc)   
              })
            })
          }    
        )    
      }, 
      getFileFromID: function(fileID){
        console.log(fileID +" yay")
        return new Promise(
          function (resolve, reject) {
            mongodb.MongoClient.connect(uri, function(err, client) {
              if(err) reject(err)
              var db = client.db('bradslavin')
              db.collection('remote_files').findOne({ externalID: fileID }, function(err, doc) {
                assert.equal(err, null)
                console.log("Found the following file: ")
                console.dir(doc.externalID)
                resolve(doc)
                reject(err)
              })
            })
          }    
        )    
      },
      base64ToFile: function(fileData, mimetype){
        base64Img.img('data:${mimetype};base64,${fileData}', '', '1', function(err, filepath) {
          
          console.log(filepath)
        });
      },
  
      buildListMessage: function(filesList){
        return new Promise(
          function (resolve, reject) {
            var message = {}
            message.attachments = []
            console.log("in buildListMessage")
            message.text = "Found: "+ filesList.paging.total + " files (Page "+filesList.paging.page+" of "+filesList.paging.pages+")"
            console.log(filesList.files.length)
            var filesArray = filesList.files
            
            for (var i = 0; i < filesArray.length; i++) {
              message.attachments[i] = {"text": filesArray[i].id+": Shared: "+filesArray[i].timestamp}
            }
            resolve(message)
            
          }    
        )    
      }
  
  
  
}

module.exports = filesUtils