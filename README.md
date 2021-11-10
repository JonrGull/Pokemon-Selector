# Pokemon-Selector

This is a collaboration project with mikemasatsugu && tristach

# What it does

It is a work in progress where the user will be able to answer several questions that narrow down their choice of pokemon to a single or similar pokemon that match that criteria. If you find one that you're looking for, click on it! Or you can answer all the questions and a few may be chosen for you!

# How it works

Created using JavaScript, React, MUI, and an API that provides Pokemon cries when selected. There are five main functions that filter Pokemon based on the user's choices. The buttons from the first two questions are mapped from available types in the main Pokemon array.
Each answer is stored in its own state so it can be easily accessed later if additional features are added. Due to this, I found it easier to cycle through questions based on if the state had be given a value other than 'null.'

The Pokemon sounds are called using an AJAX call to a pokemonAPI database that holds my sounds. So please wait a second For now, most of them work. But I don't know if I will be able to get #6, #9, and #15 to work. I believe those are the only three that won't play a sound.

# Turn down your speakers a little!

<a href="https://jonrgull.github.io/Pokemon-Selector/">Live demo!</a>

# Future features

There are several ideas that we had when designing this program.

- Randomized questions
- Further tune questions so that if only Pokemon that are left that all match that same criteria, the program would end early and return those Pokemon.
  - For example, if two Pokemon are left that can evolve, and fit the same height/weight category, I'd like for the program to just skip the last few questions and return the two Pokemon.
- Add a feature to 'Go back' a question or have a function that maps the fulfilled states as a user progresses. Similar to Reactjs.org's Tic-Tac-Toe example.
- Japanese language support that would change the buttons and questions into Japanese.
- Animations
- Somehow fix the Pokemon that don't make cries. Unfortunately this may be an issue with the API provider itself.
