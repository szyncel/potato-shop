var env = process.env.NODE_ENV || 'development';
console.log('env ***********', env);
if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost/potato-shop';
}else if (env === 'production') {
    process.env.MONGODB_URI = 'mongodb://localhost/potato-shop';
}