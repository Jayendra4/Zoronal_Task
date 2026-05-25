# Review&RATE - Company Review & Rating Platform

A simple and easy-to-use platform where you can find, review, and rate different companies. It's built using the MERN stack (MongoDB, Express, React, Node) and focuses on a clean design and smooth user experience.

## What it does

- **Find Companies**: Search for companies by name or filter them by city.
- **Ratings & Reviews**: Share your experience by leaving a review and a star rating.
- **Real-time Updates**: The average rating and total review count update automatically whenever a new review is added.
- **Sorting**: You can sort companies by their name, highest rating, or the latest ones added.
- **Likes**: You can "Like" reviews left by others.

## Tech Stack

- **Frontend**: React (with Vite), Standard CSS , React Router, and Axios.
- **Backend**: Node.js and Express.
- **Database**: MongoDB with Mongoose.

## How to setup

### Backend
1. Go into the `Backend` folder: `cd Backend`
2. Install everything: `npm install`
3. Create a `.env` file and add your MongoDB URL:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_url
   ```
4. Start the server: `npm run dev`

### Frontend
1. Go into the `Frontend/assignment` folder: `cd Frontend/assignment`
2. Install everything: `npm install`
3. Start the app: `npm run dev`

## API Endpoints

- `GET /api/companies` - List all companies (search & filter included)
- `POST /api/companies` - Add a new company
- `POST /api/reviews` - Post a review
- `GET /api/reviews/company/:id` - Get all reviews for a company
- `PUT /api/reviews/:id/like` - Like a specific review


