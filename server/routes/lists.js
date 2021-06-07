const express = require('express');
const router = express.Router();
const { List } = require("../models/List");
const { auth } = require("../middleware/auth");




router.post('/', (req, res) => {

    //받아온 정보들을 DB에 넣어준다
    const list = new List(req.body)

    list.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})



router.post('/lists', (req, res) => {

    //list collection에 있는 모든 리스트 목록 불러오기

    List.find()
        .populate("writer")
        .exec((err, listInfo) => {
            if (err) return res.satatus(400).json({ success: false, err })
            return res.status(200).json({ success: true, listInfo })
        })


})




// router.post('/modify', (req, res) => {

//     List.findOneAndUpdate


// })


router.post('/modify', (req, res) => {

    //받아온 정보들을 DB에 넣어준다
    const modifylist = new List(req.body)

    List.findOneAndUpdate({ writer: modifylist.writer._id, _id: modifylist._id }, {state: '완료'}, function(err) {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
  });

})



router.post('/delete', (req, res) => {

    //받아온 정보들을 DB에 넣어준다
    const removelist = new List(req.body)

    List.findOneAndRemove({ writer: removelist.writer._id, _id: removelist._id }, function(err) {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
  });

})



module.exports = router;