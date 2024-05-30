### Event Management Platform: Front End

#### Overview
This repository contains the source code for the Event Management Platform, an application designed to facilitate event browsing, ticket booking, and event management. This platform helps users to manage their event attendance and allows administrators to oversee and control event listings and bookings.

#### Features

- **Event Listing and Details**
  - Display a curated list of upcoming company-organized events.
  - Include critical event details such as title, date, location, and ticket availability.

- **Ticket Booking**
  - Feature an interface for users to select and book a specified number of tickets.
  - Simplify the booking process to ensure user-friendliness.

- **User Dashboard**
  - Enable users to view their booked events.
  - Allow users to cancel their bookings as necessary.

- **Admin Dashboard**
  - Provide a dedicated admin dashboard for event management accessible only by administrators.
  - Admin functionalities include adding, editing, and deleting event listings, and managing bookings.

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
  - **MongoDB**: Utilized as the NoSQL database for storing event and booking data.
  - **Express.js & Node.js**: Serve as the backend framework and runtime environment, respectively.

#### Project Structure

- `src/`: Contains all the frontend code, components, and styling.

#### Setup and Running the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/muhozajohn/etite-ltd-eventmanagment-fe.git
   cd etite-ltd-eventmanagment-fe
   ```

2. **Install Dependencies**
   - For frontend:
     ```bash
     cd etite-ltd-eventmanagment-fe
     npm install
     ```

3. **Environment Setup**
   - Create a `.env` file in the `server` directory with the necessary environment variables.

4. **Run the Application**
   - In a new terminal, start the frontend application:
     ```bash
      cd etite-ltd-eventmanagment-fe
     npm run start
     ```

5. **Access the Application**
   - The frontend will be available at `http://localhost:3000`
 
