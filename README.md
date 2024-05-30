### Online Art Finder and Exhibition: Front End

#### Overview
This repository contains the source code for the Online Art Finder and Exhibition platform, an application designed to facilitate browsing, purchasing, and managing art products made in Rwanda (Ubugeni). This platform helps users explore and buy unique art pieces while allowing administrators to oversee and control product listings and orders.

#### Features

- **Art Product Listing and Details**
  - Display a curated list of available art products made in Rwanda.
  - Include critical product details such as title, artist, price, and availability.

- **Product Purchase**
  - Feature an interface for users to select and purchase a specified number of art pieces.
  - Simplify the purchasing process to ensure user-friendliness.

- **User Dashboard**
  - Enable users to view their purchased products.
  - Allow users to manage their orders as necessary.

- **Admin Dashboard**
  - Provide a dedicated admin dashboard for product management accessible only by administrators.
  - Admin functionalities include adding, editing, and deleting product listings, and managing orders.

- **UI/UX**
  - Utilize Tailwind CSS for styling to ensure a consistent and clean aesthetic.
  - Design the UI focusing on ease of use and intuitive navigation.

- **Error Handling and Validation**
  - Implement validation for user inputs and form submissions.
  - Display clear and helpful error messages for invalid actions.

#### Technical Stack

- **Frontend**
  - **React.js**: Used for building the user interface.
  - **Redux**: Applied for state management across the React app.
  - **Tailwind CSS**: Chosen for rapid UI development and responsive design.

- **Backend**
  - **MERN Stack**: Comprising MongoDB, Express.js, React.js, and Node.js.
  - **MongoDB**: Utilized as the NoSQL database for storing product and order data.
  - **Express.js & Node.js**: Serve as the backend framework and runtime environment, respectively.

#### Project Structure

- `src/`: Contains all the frontend code, components, and styling.

#### Setup and Running the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/muhozajohn/online-art-finder.git
   cd online-art-finder
   ```

2. **Install Dependencies**
   - For frontend:
     ```bash
     cd online-art-finder
     npm install
     ```

3. **Environment Setup**
   - Create a `.env` file in the `server` directory with the necessary environment variables.

4. **Run the Application**
   - In a new terminal, start the frontend application:
     ```bash
     cd online-art-finder
     npm start
     ```

5. **Access the Application**
   - The frontend will be available at `http://localhost:3000`
