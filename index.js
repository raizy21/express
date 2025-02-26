import express from "express"; // Import express

const app = express(); // Create an express app

const PORT = 3000; // Define a port
app.use(express.json()); // Enable parsing of JSON objects

// Define the route for the root URL
app.get("/", (req, res) => {
  res.send("Hello World"); // Send the response
});

// Define the route for the /about URL
app.get("/about", (req, res) => {
  res.send("About Us"); // Send the response
});

// Define the route for the /contact URL
app.get("/contact", (req, res) => {
  res.send("Contact Us"); // Send the response
});

let users = []; // Create a users array
let nextId = 1; // Create a variable to hold the next ID

//add a n user
app.post("/users", (req, res) => {
  // Define the route for creating a new user
  const { name, about } = req.body; // Get the user object from the request body
  const newUser = { id: nextId++, name, about }; // Create a new user object

  users.push(newUser); // Add the user to the users array
  res.status(201).send(newUser); // Send the user object in the response
});

//route get all users
app.get("/users", (req, res) => {
  // Define the route for getting all users
  res.status(200).send(users); // Send the users array in the response
});

//route get user by id
app.get("/users/:id", (req, res) => {
  // Define the route for getting a user by ID
  const id = parseInt(req.params.id); // Get the ID from the request parameters
  const user = users.find((user) => user.id === id); // Find the user by ID

  if (user) {
    res.status(200).send(user); // Send the user object in the response
  } else {
    res.status(404).send("User not found"); // Send an error message
  }
});

//route update user by id
app.put("/users/:id", (req, res) => {
  // Define the route for updating a user by ID
  const id = parseInt(req.params.id); // Get the ID from the request parameters
  const { name, about } = req.body; // Get the updated user object

  const user = users.find((user) => user.id === id); // Find the user by ID

  if (user) {
    user.name = name; // Update the name
    user.about = about; // Update the about
    res.status(200).send(user); // Send the updated user object
  } else {
    res.status(404).send("User not found"); // Send an error message
  }
});

//route delete user by id
app.delete("/users/:id", (req, res) => {
  // Define the route for deleting a user by ID
  const id = parseInt(req.params.id); // Get the ID from the request parameters
  const index = users.findIndex((user) => user.id === id); // Find the index of the user

  if (index !== -1) {
    users.splice(index, 1); // Remove the user from the users array
    res.status(204).send("deleted"); // Send a 204 status code
  } else {
    res.status(404).send("User not found"); // Send an error message
  }
});

// Define the route for the root URL
app.listen(PORT, () => {
  // Start the server
  console.log(`Server is running on port http:localhost/${PORT} ...`);
});
