# React-Admin DataProviders

React-admin is unique in the way that it processes the interactions between your frontend and backend:

![resim](https://user-images.githubusercontent.com/32218770/153758409-6961124a-d4b0-406c-b88b-083b9150672e.png)

It uses something called an adapter approach (data providers): the data provider acts as the interface between the framework and your backend → it takes care of the querying and response handling between the frontend & your respective backend API(s) to allow you to focus on your dashboard building in modular steps.
To start, react-admin gives us data providers that can be used to backwards engineer our API’s if they haven’t already been built, or in the more likely scenario that they already exist, you can write your own data providers to interface with your existing APIs.

For more information about react-admin, checkout https://marmelabs.com
