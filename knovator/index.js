const app=require("./app");

const {PORT}= require("./env");

const startapp=()=>{
  app.listen(PORT,()=>{
    console.log('Auth Backend running on port ',`${PORT}`);
  })
};

startapp();