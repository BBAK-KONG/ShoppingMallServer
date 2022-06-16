const express = require("express");
const router = express.Router();
const url = require('url')
const AWS = require('aws-sdk');


const BUCKET_NAME = 'bucket-wkx1ed'
const BUCKET_URL = 'bucket-wkx1ed.s3.ap-northeast-2.amazonaws.com'

AWS.config.update({
    region:         'ap-northeast-2',
    accessKeyId:    'AKIATIIKUHVXRN7EW2MV',
    secretAccessKey:'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'
})

router.get('/*', (req,res)=>{
    const {pathname} = url.parse(req.url, true)
    res.redirect(`https://${BUCKET_URL}${pathname}`)
})

  module.exports = router;
