import express from 'express';

const router = express.Router();

router.route('/test').get((req, res) => {
    return res.json({data: "test"})
});
