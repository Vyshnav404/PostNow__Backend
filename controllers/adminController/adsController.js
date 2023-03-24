const Ads = require('../../models/AdsModel')

const createAds = async(req,res)=>{
    try {
    const {url,title,description} = req.body;
    await Ads.create({
        imageUrl:url,
        title,
        description
    }).then((response)=>{
        console.log(response);
        res.status(200).json(response)
    })
    

    } catch (error) {
       console.log(error); 
    }
}

const getAllAds = async(req,res)=>{
    try {
        await Ads.find().then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}


const deleteAd = async(req,res)=>{
    try {
        let id = req.params.id
        await Ads.findByIdAndDelete(id).then((response)=>{
            res.status(200).json(response)
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    createAds,
    getAllAds,
    deleteAd
}