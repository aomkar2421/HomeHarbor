import express from 'express';

const router = express.Router();

router.get('/test', ()=>{
    console.log("auth routr jkjhget")
})

export default router;