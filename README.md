# 🏋️ FitTrack Pro

> **Professional Fitness Tracking Application** - Track your workouts, monitor progress, and achieve your fitness goals with ease.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://fit-track-pro-phi.vercel.app/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.0+-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)

## 🌟 Features

### 📊 **Workout Management**
- **Add Workouts**: Track exercises with weight, reps, and custom images
- **Exercise Library**: Pre-loaded exercise database with proper form images
- **Smart Recommendations**: AI-powered weight and rep suggestions based on experience level
- **Progress Tracking**: Visual progress monitoring with statistics

### 🎯 **Advanced Functionality**
- **Image Modal**: Click any workout image for full-screen viewing
- **Rest Timer**: Built-in rest timer for optimal workout pacing
- **Search & Filter**: Find workouts quickly with advanced filtering
- **Sort Options**: Sort by date, weight, reps, or custom criteria
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎨 **User Experience**
- **Modern UI**: Clean, professional interface with smooth animations
- **Gender-Specific Images**: Exercise images tailored for male/female users
- **Real-time Updates**: Instant feedback and error handling
- **Toast Notifications**: User-friendly success/error messages
- **Dark/Light Theme**: Adaptive design system

## 🚀 Live Demo

**Experience FitTrack Pro:** [https://fit-track-pro-phi.vercel.app/](https://fit-track-pro-phi.vercel.app/)

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **CSS3** - Custom styling with CSS variables and modern design
- **Date-fns** - Date manipulation and formatting
- **Responsive Design** - Mobile-first approach

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **RESTful API** - Clean API architecture

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v16.0 or higher)
- MongoDB Atlas account
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/fit-track-pro.git
cd fit-track-pro
```

### **2. Backend Setup**
```bash
cd backend
npm install
```

**Create Environment File:**
```bash
# Create .env file in backend directory
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workout-app?retryWrites=true&w=majority
NODE_ENV=development
```

### **3. Frontend Setup**
```bash
cd frontend
npm install
```

**Create Frontend Environment File:**
```bash
# Create .env file in frontend directory
REACT_APP_API_URL=https://fittrack-pro.onrender.com
```

**For Local Development:**
```bash
# Use local backend
REACT_APP_API_URL=http://localhost:4000
```

### **4. Database Configuration**
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to the whitelist
4. Create a database user
5. Copy the connection string to your `.env` file

### **5. Run the Application**

**Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:4000
```

**Start Frontend:**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

## 📱 Usage

### **Adding Workouts**
1. Select exercise type (Chest, Back, Legs, etc.)
2. Choose your gender for appropriate exercise images
3. Enter exercise name (search from library or custom)
4. Set weight and repetitions
5. Add optional custom image URL
6. Click "Add Workout"

### **Managing Workouts**
- **View**: Browse all your workouts with images
- **Edit**: Click edit button to modify workout details
- **Delete**: Remove workouts you no longer need
- **Search**: Use the search bar to find specific exercises
- **Sort**: Organize by date, weight, or reps

### **Image Features**
- **Click Images**: Click any workout image for full-screen view
- **Modal View**: Press Escape or click outside to close
- **Responsive**: Images adapt to your screen size

## 🏗️ Project Structure

```
fit-track-pro/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context providers
│   │   └── config/         # Configuration files
│   ├── public/
│   │   ├── images/         # Exercise images
│   │   └── exercises.json  # Exercise database
│   └── package.json
├── backend/
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### **Workouts**
- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Create new workout
- `GET /api/workouts/:id` - Get single workout
- `PATCH /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### **Request/Response Examples**

**Create Workout:**
```json
POST /api/workouts
{
  "title": "Barbell Squat",
  "load": 100,
  "reps": 8,
  "gender": "male",
  "exerciseType": "legs",
  "imageUrl": "https://example.com/image.jpg"
}
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Modern purple gradient (#6366f1)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Background**: Light gray (#f8fafc)

### **Typography**
- **Font Family**: Inter, Poppins
- **Weights**: 300, 400, 500, 600, 700, 800

## 🚀 Deployment

### **Frontend (Vercel)**
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable: `REACT_APP_API_URL=https://fittrack-pro.onrender.com`
5. Deploy automatically on push

### **Backend (Render)**
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `NODE_ENV=production`
   - `PORT=4000`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sahda Samier**
- GitHub: [@sahdasamier](https://github.com/sahdasamier)
- Live Demo: [FitTrack Pro](https://fit-track-pro-phi.vercel.app/)

## 🙏 Acknowledgments

- Exercise images and database
- React and Node.js communities
- MongoDB Atlas for database hosting
- Vercel and Render for deployment platforms

---

<div align="center">

**⭐ Star this repository if you found it helpful!**



</div>
