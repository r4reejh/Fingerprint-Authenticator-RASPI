const {identifyEnroll} = require('./util/spawnUtil')
module.exports = {
    userInfo: {
        fetch: async (domain)=>{
            let user = await allData.find({domain:domain});
            if(user.length>0)
            return true;
            else
            return false;
        }
    },
    user_fp_id:async ()=>{
        let data =await identifyEnroll()
        return data
    },
    
}