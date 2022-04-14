# uPayments

While developing this application you don’t have to follow the exact same design but we
are expecting something similar to this.
Also developing this application with TypeScript, using TailwindCSS and writing Test
cases is going to be a plus.
You are free to use any third party libraries that you would like to.
Expected functionalities are as follows:

1. Get the products and categories from the API and list on the Home Page
2. When a product is clicked navigate to the Detail Page with that product’s
   information
3. Delete a product from the list
4. With help of a button, go to Create Screen and create a product from there
   a. Product object must contain these fields while sending a post request:
   i. Name (string)
   ii. Price (number)
   iii. Category (string)
   iv. Description (string)
   v. Avatar (string)
   vi. DeveloperEmail (string)
5. When a product is created navigate back to the Home Page and show updated
   data
6. Filter the listed items according to their Categories
