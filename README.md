<p align="center"><img width="600" height="300" src="https://elordenmundial.com/wp-content/uploads/2020/10/NBA-logo-baloncesto-historia-deporte-estados-unidos.jpg"></p>

<h1 align="center">NBA REST API</h1>

<h3 align="center">
Open Source REST API for the best league in the world!
</h3>

<p align="center">
<img src="https://img.shields.io/badge/release-v1.0.0-1DA4D5">
<img src="https://img.shields.io/badge/uptime-100%25-369011">
<img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square">
</p>

<h4 align="center">
  <i>
    We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with NBA, or any of its subsidiaries or its affiliates. The names NBA as well as related names, marks, emblems and images are registered trademarks of their respective owners.
  </i>
</h4>

<br>
<br>

<div>
 <b>Technologies used in this project: </b> 
 <br />
 <br />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/AWS_Lambda-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" />
  <br />
  <br />
  
  
# Documentation
  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16013993-caf084a3-b439-4b43-9b9f-67a9fcf1d298?action=collection%2Ffork&collection-url=entityId%3D16013993-caf084a3-b439-4b43-9b9f-67a9fcf1d298%26entityType%3Dcollection%26workspaceId%3Daa0bb4e2-e714-4968-bd39-d9d56f9c0f3d)
<br/>
<br/>

## Players
  ### Get All Players
  This endpoint retrieves all players from all seasons.
  
  - #### HTTP Request: 
  `GET https://klqn0hf9bk.execute-api.us-east-1.amazonaws.com/prod/v1/players`
  
  - #### Query parameters
  
| Parameter               | Default   | Description  |
|-------------------------|-----------|--------------|
| page       |0 | The page number used for pagination |
| limit      | 20 | the number of results returned per call, used for pagination. Max 100    | 
| search   | | Used to filter players based on their name. For example, ?search=davis will return players that have 'davis' in their first or last name.  |

  
 ### Post Player
  This endpoint let´s you post a new player (for example to upload a new draft class) - You need a special API-KEY to do this.
  - #### HTTP Request
  `POST https://klqn0hf9bk.execute-api.us-east-1.amazonaws.com/prod/v1/players`
  
  - #### Body example
  `{
    "first_name": "Zaire",
    "last_name": "Wade",
    "position": "G",
    "team": {
        "teamId": 29,
        "full_name": "Utah Jazz"
      }
  }`
  
  - #### Headers
  `x-api-key: secretValue`
  
  ### Delete Player
  This endpoint let's you delete a player (for example a player retires) - You need a special API-KEY to do this.
  
  - #### HTTP Request
  `DELETE https://klqn0hf9bk.execute-api.us-east-1.amazonaws.com/prod/v1/players/<ID>`
  
  - #### URL Parameters
  | Parameter | Description  |
  |----------|--------------|
  | ID        | ID of the player to Delete |
  
  - #### Headers
  `x-api-key: secretValue`
  
  ## Teams
  ### Get All Teams
  This endpoint retrieves all teams for the current season.

  - #### HTTP Request 
  `GET https://klqn0hf9bk.execute-api.us-east-1.amazonaws.com/prod/v1/teams`

  ### Get Specific Team

  - #### HTTP Request
  `GET https://klqn0hf9bk.execute-api.us-east-1.amazonaws.com/prod/v1/teams/<ID>`

  - #### URL Parameters
  | Parameter | Description  |
  |----------|--------------|
  | ID        | ID oh the team to retrieve |
  
  
  
  
  

  
