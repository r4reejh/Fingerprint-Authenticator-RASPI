const {spawn} = require('child_process');
const {datastore} = require('nedb-promise');

module.exports= {
    identify:(sockId,domain)=> {
        let id_prog = spawn('python',['-u','./runnables/identify.py'],{stdio : "pipe"});
        id_prog.stdout.on('data',async (data)=>{
            if(String(data).indexOf('>')>=0){
                ios.to(sockId).emit('stream',{txt:data.toString()});
            }
            else {
                let trimmed_stdout = data.toString().trim();
                if(!isNaN(trimmed_stdout)){
                    let fps_i = parseInt(trimmed_stdout);
                    if(fps_i<20 && fps_i>0){
                        let user = await allData.findOne({fp_id:String(fps_i),domain:domain});
                        if(user){
                            ios.to(sockId).emit('credentials',{username:user.username,password:user.password});
                        } else {
                            ios.to(sockId).emit('stream',{txt:'User Not found Error'});
                        }
                    } else {
                        ios.to(sockId).emit('stream',{txt:'User not Registered'});
                    }
                } else {
                    ios.to(sockId).emit('stream',{txt:'Identification Error'});
                }
            }
        });

        id_prog.on('exit',(code)=>{
            ios.to(sockId).emit('stream',{txt:'Process Complete'});
        });
    },

}