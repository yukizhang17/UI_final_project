# Wine Tasting - UI Project

## Introduction

We aim to teach people the basics of the subtle art of wine tasting. You can learn all about how to sip wine properly and the different properties to look out for in a wine. We also introduce you to some of the popular wines out there.

## CSS Structure

#### Information Structure

We follow a two-column structure for displaying most pages on the website. The following classes come in play:

1. `.section-wrapper`: This is the wrapper class for any webpage (like the .container class in Boostrap). This divides the webpage into multiple columns using flexbox.
2. `.section`: This is the class for an individual section. It may contain either text or an image. We encourage the use of another class on the element which has this class:
   1. `.section-left`: Adds some `padding-left` to this section.
   2. `.section-right`: Adds some `padding-right` to this section.
3. .section-image: This class should be applied to any image added in `.section`. This class makes sure that the image resizes to fit into the section properly and not overflow.

#### Navbar

We also built a custom navbar as per our needs. It uses the following classes and elements:

1. `header`: This is the parent element of the navbar. It contains the `nav` element as well as the `.nav-collapse` element.
2. `nav`: This is the lifeline of the navbar. It houses the title of the website as well as the actions (`.actions`). It behaves differently according to the screen size. In laptop screens it has the following code:

   ```
   nav {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   ```

   This makes sure that the title as well as the actions (call to action buttons) are vertically aligned as well as placed on the same line. The title is on the left side and the actions on the right.

   For mobile screens, the `nav` is initially hidden. When the user click the `.nav-collapse` icon, the `nav` comes up as a full screen with the title of the webpage as well as the different actions that the user can perform.
3. `.actions`: These are the actions that the user can perform. They are generally links to different pages (in our case the Learn and Quiz pages).
4. `.nav-collapse`: This icon is only visible in mobile devices (`breakpoint <= 768px`). When clicked, this icon toggles the full screen navbar in mobile devices.

#### Buttons

For the buttons, we define the following two main classes:

1. `.custom-btn`: This class normalizes the button in to its default state (to deal with different browsers). It sets the groundwork for styling the button next.
2. `.btn-type-1`: This class sets the style of the button. This button has a black solid border of 2px and some padding around the text. Its background is transparent. On hover, the button's background turns black, the text turns white, and its border transparent. We also add a small transition to make this transition seem seamless.

#### Fonts

Currently we use only one font in our website:

1. Playfair Display

## Team Members

* Yuqi Zhang - yz3983
* Da Yeon Lee - dl2950
* Parth Jawale - pcj2105
* Sai Satwik Vaddi - sv2665

**Note:** This is still a project in progress.
