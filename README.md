This is the project I developed for the final assessment project for
Udacity's React Native course. The goal of this project is
to meet the specifications defined by the project specification.

## Initialization Instructions

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

To get the project installed and launched, use `yarn` and `yarn start` respectively.

### Environment

This application needs environment configuration to work properly.
*The default environment file is not ignored to avoid additional installation steps.*

The environment location: `src_root/.env`
The environment example location: `src_root/.env.example`

## Usage

Here is the key usage instructions:

- The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.
- Pressing on a deck in the list animates the deck opacity, and the app routes to the individual deck view.
- The individual deck view includes The deck title, Number of cards in the deck, option to start a quiz for that deck and an option to add a new question to the deck.
- Pressing the 'Start a Quiz' or 'Create New Question' button routes to the views for those activities.
- The New Question view includes a form with fields for a question and answer, and a submit button. Submitting the form adds the question to the deck and to the local storage.
- The Quiz view starts with a question from the selected deck.
- The question is display, along with a button to show the answer.
- Pressing the 'Show Answer' button displays the answer.
- Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
- The view displays the number of questions remaining like Question 1/3.
- When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
- When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
- There is a plus button for creating new decks which has just an input for the title.
- Pressing the Create Deck button creates the deck and routes the user to the Individual Deck view.
- The app uses local push notifications. Push notifications are generated at 21:30 if the user hasn't completed at least one quiz for that day.
- The app works correctly in either Android OR iOS devices (or emulator).

## Tested With Devices:
Samsung Galaxy Note 4
Apple IPhone 6S v11.1
Google Pixel 7.1.0 API 25

## License

See [LICENSE](LICENSE.md) file.


## Contributing

This repository is created for Udacity reviewers. Therefore, I will not accept any pull requests.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.
