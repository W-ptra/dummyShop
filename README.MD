# DummyShop

A mockup e-commerce website with design draw inspiration from www.pixiv.net

## Technologies Used

#### Frontend  
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

#### Backend  
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)  ![Spring Boot](https://img.shields.io/badge/springboot-%236DB33F.svg?style=for-the-badge&logo=springboot&logoColor=white)  ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)


#### Database & Storage  
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)  ![Azure Blob Storage](https://img.shields.io/badge/Azure%20Blob%20Storage-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)

## Features
- Login & Register
  
![img](https://drive.google.com/uc?export=view&id=1Mj2wtwBB10APEXAds6wtzpaLZQpFl5wM) 
  
- Home Page
  
![img](https://drive.google.com/uc?export=view&id=1vaSq5t8Bvi4JB8A-_yVlS3p4C3HaMipm)
![img](https://drive.google.com/uc?export=view&id=1HmgQf3MTf3V9Hn62qTpPGjFGK-QuSZTX)
  
- Searching by name and Tags
  
![img](https://drive.google.com/uc?export=view&id=1d68elm_ma2WuBQJKRLLabyUlwN3Gc-a4)
  
- Product page
  
![img](https://drive.google.com/uc?export=view&id=1gfPk5n5BuYgjFRCmUlZfa_CaClV78Tks)
![img](https://drive.google.com/uc?export=view&id=1E0pBkgqhDCt4V0bX7YDKQQ5oOg27OdaY)
![img](https://drive.google.com/uc?export=view&id=1q8SJiU6kvHxqqmQtQvfAaaKv7UBgzhT1)
  
- My Product pages (Seller)
  
![img](https://drive.google.com/uc?export=view&id=1rzjr1XbwBNZbZG725lS3r8josdkWP3Ey)
  
- Cart page
  
![img](https://drive.google.com/uc?export=view&id=1_6Oe4coIb54LcnjB6osvvMyY4dyevFMR)
![img](https://drive.google.com/uc?export=view&id=1c7AM7mOC6yTXRDiPMwSExPDwsqvfyEqF)
  
- Transactions Page
  
![img](https://drive.google.com/uc?export=view&id=1t2LY76I3DYQTM1qZky6oEQfARcIqax9N)

- Post Review page

![img](https://drive.google.com/uc?export=view&id=1a9mw2DwO-w6HosGt7v3A7anUWZnmh4KZ)
  
- Profile Page
  
![img](https://drive.google.com/uc?export=view&id=1yX8M5O0XeVIwR6vX5qpi49WuLJCqtT3w)

## Prerequisite
1. ``java 17``
2. ``maven v3.9.9``
3. ``node v 20.2.0``
4. ``Microsoft Azure blob storage url and SAS token``

## Installations
1. clone this project
```
git clone https://github.com/W-ptra/dummyShop.git
```
2. modify ``application.property.example`` based on your setting, can be found at ``/dummyShop/backend/src/main/resources/application.property.example``. After modify remove the ``.example`` extension
3. install spring boot dependency and run it using maven. ``inside backend directory``
```
mvn clean install
mvn spring-boot:run
```
4. install npm package and run react. ``inside frontend directory``
```
npm install
npm run dev
```
5. Open browser and access following url
```
http://localhost:7000
```