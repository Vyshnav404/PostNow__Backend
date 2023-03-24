const Ads = require('../../models/AdsModel')


const getAdsData = async(req,res)=>{
    try {
        await Ads.find().then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
       console.log(error); 
    }
}

module.exports = {
    getAdsData
}