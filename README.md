# Web Development Final Project - *Fin Surf*

Submitted by: **Andre Bayucan**

This web app: **Fin Surf is a forum where users can create, edit, delete, read, upvote, and comment on posts about marine life. Using the public REST API provided by the Ocean Biodiversity Information System (OBIS), this website allows visitors to browse through and sort millions of marine life occurrences. Visitors can see an organism's scientific name, record date, taxonomic hierarchy, and that creature's number of occurrences in the OBIS database.**

Time spent: **20+** hours spent in total

## Required Features

The following **required** functionality is completed:


- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms should have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app must include home feed displaying previously created posts
  - By default, each post on the posts feed should show only the post's:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post should direct the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    -  creation time
    -  upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - The app includes a separate post page for each created post when clicked, where any additional information is shown, including:
    - content
    - image
    - comments
  - Users can leave comments underneath a post on the post page
  - Each post includes an upvote button on the post page. 
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times

- [x] **A post that a user previously created can be edited or deleted from its post pages**
  - After a user creates a new post, they can go back and edit the post
  - A previously created post can be deleted from its post page


The following **additional** features are implemented:

* [x] Posts on the main page also display a preview of content
* [x] Users can page through posts and specify how many posts per page they would like to view
    * [x] Similarly, the sea life page allows users to determine the query size and offset number
* [x] A loading animation displays when fetching sea life

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<video src="https://github.com/user-attachments/assets/c896789d-f0f3-4bbc-96d8-5f1bd3914caf" autoplay loop muted playsinline></video>

<!-- Replace this with whatever GIF tool you used! -->
GIF created with QuickTime Player  

## Notes

The OBIS API proved to be a challenge to work with due to the limited number of query options I could use. If I wanted to allow the user to page through creature occurrence results in the Sea Life tab, I would need to use the "after" parameter, which would specify which occurrence id the query should begin fetching results after. At first, I thought of turning this into a pagination system, where I would get the id of the last occurrence displayed on the page and use that for the after parameter. After mulling this idea over, however, I realized that it would become difficult to implement if a user wanted to skip ahead more than one page, requiring multiple queries to get the last id. Instead, I simply used the query size and the page / offset number to calculate the retrieval range, letting me to implement pagination in a single query. I did need to more queries to get images for the organisms, however, as the OBIS API did not provide any media. The iNaturalist API -- which I had used in previous projects -- had images for many organisms, so I passed in the scientific names of animals in queries to get image URLs.

## License

    Copyright [2026] [Andre Bayucan]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
