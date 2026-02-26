# Assignment2-RapidPrototyping
Card Game - Assignment 2 for the Rapid Prototyping Class at VFS

## Overview
The goal for this assignment is to create 3 different prototypes base on a first iteration of a _Deck Builder Card Game_, from which we have done a design thinking session and iteretion work based on it. 

Each prototype has a basic navigation between different screens or components, have mock interactions, and all of them includes the functional mechanic of building your own deck.

## Design Notes
### Problem statement
Provide maximum useful information while avoiding an overcrowded interface

### Key actions supported
- Browse via grid + scroll
- Search and filter/sort (type, energy/cost, name, attack power, etc.)
- View quick card details (hover / preview)
- View full details (tap/click)
- Add/remove single or multiple copies
- Deck stats summary
- Deck art customization (mock)

### Design Notes Document
You can see the design notes document [here](https://drive.google.com/file/d/1FJenxkvW8quFOBBm2auFItn33xZfnrz_/view?usp=sharing)

## Prototypes
### Prototype 1 - Interaction Focus (Drag & Drop)
This prototype's goal is to test whether a drag-and-drop interaction improves the deck buildig flog versus the first version, which was click-based. This prototype has emphasis on direct manipulation of the cards and is useful for testing speed and "feel" of a deck building.

### Prototype 2 - Visual Clarity Focus (Information Hierarchy)
This prototype's goal is to improve the readability and reduce the visual overload of the game, while keeping all the information accessible for the player. This prototype strongly focus on changing:
- Having higher contrast and stronger typography hierarchy
- Having the card's stats displayed with icons for faster scanning
- Simplify and organize the sidebar section
- Changing the deck (edit/delete/clear) actions and counters

### Prototype 3 - Guided Flow Focus
This prototype's goal is to restructure the prototype's flow into a guided experience to reduce decision fatigue and have a more linear gameplay.

## How to run
For all 3 prototypes, and after clonning the project open a `cmd` in the folder containing the code and run:

### Install dependencies
```bash
npm install
```

### Start project
```bash
npm run dev
```

When you run this command the app will start in a local host port

## Github link
[Github Here](https://github.com/FernandezDL/Assignment2-RapidPrototyping.git)
