# Environment Variables Setup

## Backend (.env)
Create a `.env` file in the `backend` directory with:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/workout-app?retryWrites=true&w=majority
PORT=4000
NODE_ENV=production
```

## Frontend (.env)
Create a `.env` file in the `frontend` directory with:

```bash
REACT_APP_API_URL=https://fittrack-pro.onrender.com
```

## Deployment
- **Render**: Add environment variables in dashboard
- **Vercel**: Add environment variables in dashboard

## Security
- Never commit `.env` files to GitHub
- Use `.env.example` files for templates
- Keep sensitive data in deployment platform settings
