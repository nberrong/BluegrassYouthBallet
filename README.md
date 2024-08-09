# Bluegrass Youth Ballet Class Schedule Finder

## Overview

This is my capstone project for CODE:You's Web Development pathway. I chose to implement this project because as the parent of two Bluegrass Youth Ballet students, I find it difficult to view and compare class schedules on BYB's website. Students are expected to make up missed classes, and the website does not make it easy to view classes schedules for different levels to find a makeup class. This is the problem that this project aims to help solve.

The project utilizes the Google Sheets API to retrieve BYB's class schedule data for use in the web app. The Class Schedules page has two buttons – one to select class levels to display and one to clear any generated schedules. When the user clicks the Select Button, the app generates a menu of checkboxes using the data from the Google Sheet. The user can select all classes from either an entire division or individual levels, and then click to display the chosen class schedules. The app filters and generates the schedules based on the user's input.

The two buttons remain above the schedules. The user can add additional selections by clicking the Select Levels button. Previous selections will remain checked in the Select Levels menu, and the user can change the selections as desired. If the user clicks the Clear All Schedules button, all generated schedules are removed from the page and the Select Levels checkbox selections are also cleared.

BYB's official website can be viewed at (https://www.bluegrassyouthballet.org).

## Resources

The resources I used for this project are as follows:

- [Third-Party API](https://developers.google.com/sheets/api/reference/rest)
  - The class schedule information is stored in a Google Sheet, and the schedule data is pulled into the application using the Google Sheets API.
- [Fonts](https://fonts.google.com/)
  - The fonts of this web application are provided by fonts.google.com

## Project Overview

The project is organized as follows:

- **Landing Page:** The landing page provides the user a button to click to access the Class Schedules app.

- **Class Schedules Page:** The web app is contained within this page and allows the user to choose which schedules to view.

## Features implemented in the project

| Feature                                                                                                                         | Description                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retrieve data from a 3rd party API and use it to display information.                                                           | The app utilizes the Google Sheets API to access the schedule information used in the web app.                                                                  |
| Use arrays, objects to store and retrieve information that is displayed in the web app.                                         | The schedule information pulled from the Google Sheet is stored in an array of objects that is used in the web app.                                             |
| Analyze data that is stored in arrays, objects, sets or maps and display information about it in the app.                       | Checkboxes to select class schedules to display are dynamically generated from the array data, and the class schedules chosen are filtered from the array data. |
| Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs. | The functions that filter the scheduled data either by dvision or level accept the full schedule and the desired filter and return a filtered schedule.         |
| Visualize data in a user friendly way.                                                                                          | The class schedules are generated into individual tables that are clean and easy to read.                                                                       |
| Visually appealing UI.                                                                                                          | Created a clean and modern UI with a color palette pulled from Bluegrass Youth Ballet's logo.                                                                   |
| Responsive Design.                                                                                                              | The web app uses media queries and flexbox to adapt the design for multiple screen sizes.                                                                       |

## Getting Started

1. Clone this repository to your local machine using Git:

```bash
git clone https://github.com/nberrong/BluegrassYouthBallet
```

3. Navigate to the project directory:

```bash
cd BluegrassYouthBallet
```

4. A "config.js" file is necessary to run the project and must be placed in the scripts folder. A link to download this file was included in the CODE:You submission form, or the file can be provided via Slack DM upon request.

5. Open the project directory in VS Code:

```bash
code .
```

6. Use the VS Code Live Server extension to view the index.html page.

7. Navigate to the Class Schedules page by either clicking the Class Schedules button or through the navigation menu under the Class Information option.

## Acknowledgments

- Kevin Powell's CSS tutorials on YouTube (https://www.youtube.com/@KevinPowell) were extremely helpful when developing this project.
- A special thank you to CODE:You mentors Michael Puckett and Khyrstina Smith, whose knowledge, experience, and willingness to help made this project possible!
