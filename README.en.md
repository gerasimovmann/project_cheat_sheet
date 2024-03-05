<!-- prettier-ignore-start -->

# Learning projects Cheat Sheet JavaScript

[![en](https://img.shields.io/badge/lang-en-blue)](/README.en.md)
[![ru](https://img.shields.io/badge/lang-ru-green.svg)](/README.md)

This training project was designed to practice React knowledge.

Visualization:

<img src="git_source/IMG_0212.gif" width="600" height="auto"/>

## Description

My second learning project using the React library. The idea for this project came about when I realized that I often have to turn to sites like MDN to get information while writing code. I was decided to develop a solution in which I would be able to put in information in addition to the existing information.

## To start

Dependencies need to be installed while being in the root directory of the project:

```bash
npm install
```

Run the application locally in the root folder of the project:

```bash
npm start
```

## What the app can do?

#### Displaying information as accordions and elements within

In this case, the textual information of the application is stored in JSON format on the Frontend part of the application.

#### Changing the color theme

Function to change the color theme by button.

#### Information change mode

<img src="git_source/IMG_0213.gif" width="600" height="auto"/>

In this mode, the application inside the interface allows you to change information (For ease of implementation, the data is stored in localStorage :smile:)

Functionality:

1. Ability to add blocks, chords
2. Add tags within an accordion:
   - h4
   - p
   - code
3. Allows you to delete an accordion block
4. Allows you to delete accordions within a block
<!-- prettier-ignore-end -->
