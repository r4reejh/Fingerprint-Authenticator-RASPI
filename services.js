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
        return '2'
    }
}