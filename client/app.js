const express = require("express")
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const db = require('./db')
const mineType = require('mime-types')
const multiparty = require('multiparty')
app.use(cors())
const url = 'mongodb://localhost/users'
const Picture =require('./Picture')
const tencentcloud = require("tencentcloud-sdk-nodejs");
const CvmClient = tencentcloud.cvm.v20170312.Client;
const models = tencentcloud.cvm.v20170312.Models;
const Credential = tencentcloud.common.Credential;
const mongoose = require('mongoose')
let cred = new Credential("AKID5E8tJT5CLCdxvju7jDJNZcS0HRx7se16", "wQgiX2QDn6eU6bhpABxdtVv5AajdnAk3");
let client = new CvmClient(cred, "ap-shanghai");
let req = new models.DescribeZonesRequest();

client.DescribeZones(req, function(err, response) {
    if (err) {
        console.log(err);
        return;
    }
   // console.log(response.to_json_string());
});


app.get('/', function (req, res)
 {
  res.sendFile(path.join(__dirname, 'static', 'build', 'index.html'))
  var pic = new Picture({

  });


})


app.post('/', async function (req, res) {


  let form = new multiparty.Form()
  form.parse(req, function (err, fields, file) {
    let item = " "
    const tags = fields.tags
    const pictures = file.pictures.map((files, index) => {
     files.tag = tags[index]    
      
      let data = fs.readFileSync(files.path)
      data = new Buffer(data).toString('base64')
      files.base64 = 'data:' + mineType.lookup(files.path) + ';base64,' + data


      const TiiaClient = tencentcloud.tiia.v20190529.Client;
      const models = tencentcloud.tiia.v20190529.Models;
      
      const Credential = tencentcloud.common.Credential;
      const ClientProfile = tencentcloud.common.ClientProfile;
      const HttpProfile = tencentcloud.common.HttpProfile;
      
      let cred = new Credential("AKID5E8tJT5CLCdxvju7jDJNZcS0HRx7se16", "wQgiX2QDn6eU6bhpABxdtVv5AajdnAk3");
      let httpProfile = new HttpProfile();
      httpProfile.endpoint = "tiia.tencentcloudapi.com";
      let clientProfile = new ClientProfile();
      clientProfile.httpProfile = httpProfile;
      let client = new TiiaClient(cred, "ap-shanghai", clientProfile);
      
      let req = new models.DetectLabelRequest();
      
      let params = {
      ImageBase64:data
      
      }
      req.from_json_string(JSON.stringify(params));
      
      client.DetectLabel(req, function(errMsg, response) {
          if (errMsg) {
              console.log(errMsg);
              return;
          }
         else{
          item = response.Labels[0].Name+ ","+response.Labels[1].Name+ ","+
          response.Labels[2].Name+","+ response.Labels[3].Name
          //console.log(response.Labels[0].Name);
        //  console.log(item)

          const TmtClient = tencentcloud.tmt.v20180321.Client;
          const models = tencentcloud.tmt.v20180321.Models;
          
          const Credential = tencentcloud.common.Credential;
          const ClientProfile = tencentcloud.common.ClientProfile;
          const HttpProfile = tencentcloud.common.HttpProfile;
          
          let cred = new Credential("AKID5E8tJT5CLCdxvju7jDJNZcS0HRx7se16", "wQgiX2QDn6eU6bhpABxdtVv5AajdnAk3");
          let httpProfile = new HttpProfile();
          httpProfile.endpoint = "tmt.tencentcloudapi.com";
          let clientProfile = new ClientProfile();
          clientProfile.httpProfile = httpProfile;
          let client = new TmtClient(cred, "ap-shanghai", clientProfile);
          
          let req = new models.TextTranslateRequest();
          
          let params = {
            Action:"TextTranslate",
            Version:2018-03-21,
            Region:"ap-shanghai",
          SourceText:item,
          Source:"zh",
          Target:"en",
          ProjectId:0
          };
          req.from_json_string(JSON.stringify(params));
          
          client.TextTranslate(req, function(errMsg, response) {
              if (errMsg) {
                  console.log(errMsg);
                  return;
              }

              files.tag = tags[index]
              files.AItag=response.TargetText    
              //console.log(files)
              let data = fs.readFileSync(files.path)
              data = new Buffer(data).toString('base64')
              files.base64 = 'data:' + mineType.lookup(files.path) + ';base64,' + data
             // console.log(files)
              // console.log(response.TargetText);
              res.json(response.TargetText)
var pics = new Picture(
  {
    pic:files
  }
)
console.log(pics)
pics.save().catch((err)=>console.log(err))
          });


         }
   
 
      });
 
      return files,item
    })







})
})



app.listen("3006", () => {
  console.log("listenning at port 3006")
})
