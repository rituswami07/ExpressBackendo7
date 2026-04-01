const corsOptions = {
    origin : (origin, callback) => {
        const whitelist = [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5000",
            "https://frontend-dusky-kappa-76.vercel.app",
            "https://expressbackendo7-4.onrender.com/api/v1/users"
            
        ];

        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS blocked"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;