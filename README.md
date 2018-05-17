# Workshop Pôle Emploi du 14 au 18 Mai 2018.

Mathieu Nicaudie, Alex Batby, Durade Romain, Sylvain Métayer

L'objectif était de détecter la détresse de l'utilisateur (pour des personnes ne maitrisant pas l'informatique) et de proposer des solutions adaptées.

Un serveur Websocket est à l'écoute, sur lequel se connecte la borne, ainsi que le centre de contrôle. 

Les émotions de l'utilisateur sont détectées à partir de la caméra, ce qui permet de savoir quand l'utilisateur est énervé.

Il est également possible de détecter quand l'utilisateur est perdu dans l'interface, c'est à dire lorsque qu'il clique au hasard sur les menus à dispositions.

## Lancement

`npm install`

`cp pe-js/config.js.sample pe-js/config.js` Modifier les valeurs

`cp app/config.js.sample app/config.js` Modifier les valeurs

`npm start`

`php -S localhost:8080`

`localhost:8080` : Borne 1

`localhost:8080/notifications.html` : Centre de notification
