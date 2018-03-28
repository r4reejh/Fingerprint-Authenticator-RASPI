const spawnUtil = require('../util/spawnUtil');
const {userInfo,user_fp_id} = require('../services')

module.exports = (io)=>{
    io.on('connection',(socket)=>{
        io.to(socket.id).emit('getId',{data:socket.id});
    })
    let routes = {
        hello: async (req,res)=>{
            res.send({message:'hello',data:123});
        },
        identify: async (req,res)=>{
            let domain = req.body['domain'];
            let UsersExist = await userInfo.fetch(domain);
            if(UsersExist){
              res.send({message:'Procesing'});
              spawnUtil.identify(req.body['sockId'],domain);
            } else {
              res.send({message:'No users found for this domain',data:123});  
            }
        },
        enrollUser: async(req,res)=>{
            spawnUtil.enrollStart();
            res.send({message:'processing'})
        },
        addDomain: async (req,res)=>{
            let domain = req.body['domain'];
            let username = req.body['username'];
            let passWord = req.body['password'];
            let fp_id = await user_fp_id();

            if(fp_id != 4004){
                let up = await allData.update({
                    fp_id:String(fp_id),
                    username:username,
                    password:passWord,
                    domain:domain
                },{upsert:true})
                if(up)
                res.send({message:'added/updated domain info for user'})
            } else {
                res.send({message:'Error adding domain'})
            }
        }
    }
    return routes;
}