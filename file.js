var fs = require('fs');  
var path = require('path');  
  
//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath = path.resolve('../DyDown/');  
  
//调用文件遍历方法  
fileDisplay(filePath);  

  
/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */  

if(fs.existsSync(filePath.replace('DyDown','newDyDown'))==false){
    fs.mkdir(filePath.replace('DyDown','newDyDown'),(err)=>{})
}

var folderName = [];
var ctrl = 0;
function fileDisplay(filePath){  
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath,function(err,files){  
        if(err){  
            console.warn(err)  
        }else{  
            //遍历读取到的文件列表  
            files.forEach(function(filename){  
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath,filename);  
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir,function(eror,stats){  
                    if(eror){  
                        console.warn('获取文件stats失败');  
                    }else{  
                        // var isFile = stats.isFile();//是文件  
                        // var isDir = stats.isDirectory();//是文件夹  
                        // if(isFile){  
                        //     console.log(filedir);  
                        // }  
                        // if(isDir){  
                        //     fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        // }  
                        if(folderName.length==0){
                            folderName.push(filedir.match(/.*\(/)[0].replace('(','').replace('DyDown','newDyDown'));
                            // console.log(filedir)
                            fs.mkdir(folderName[0],(err)=>{});
                        }else{

                            for(let i=0;i<folderName.length;i++){

                                // console.log(filedir.match(/.*\(/));
                                // console.log(folderName[i].match(/.*\(/)[0]);
                                var filedirN = filedir.match(/.*\(/)[0].replace('(','').replace('DyDown','newDyDown');
                                // console.log(filedir)
                                var folderNameN = folderName[i];
                                // console.log(filedirN);
                                // console.log(folderNameN);
                                if(filedirN==folderNameN){
                                    // folderName.push(filedir);
                                    // console.log(folderName)
                                    ctrl=1;
                                    break;
                                }else{
                                    
                                    ctrl=2;
                                }
                            }
                            
                            if(ctrl==2){
                                const resultArr = filedirN.replace('(','');
                                // console.log(resultArr)
                                folderName.push(resultArr);
                                // console.log(resultArr)
                                if(fs.existsSync(resultArr)==false){
                                    fs.mkdir(resultArr,(err)=>{});
                                }
                                

                                // console.log(filedir.split('('))
                            }
                        }
                        
                        
                        
                    }  
                })  
                
            });  
            
        }  
    });  
    fileDisplay1(filePath,folderName); 
}

var notExist = 0;
// console.log(filePath)
//读取每个视频的路径
function fileDisplay1(filePath1,folderName){  
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath1,function(err,files){  
        if(err){  
            console.warn(err)  
        }else{  
            //遍历读取到的文件列表  
            files.forEach(function(filename){  
                //获取当前文件的绝对路径  
                const filedir = path.join(filePath1,filename);  
                
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir,function(eror,stats){  
                    if(eror){  
                        console.warn('获取文件stats失败');  
                    }else{  
                        const isFile = stats.isFile();//是文件  
                        const isDir = stats.isDirectory();//是文件夹  
                        if(isFile){  
                            if(!filedir.match(/作者信息/)){
                                
                                // console.log(filedir)
                                const rs =fs.createReadStream(filedir);
                                const judgeRs = filedir.match(/DyDown\\.+\(/)[0].replace('(','').replace('DyDown\\','');
                                // const judgeEx = 
                                // console.log(folderName)
                                for(let i=0;i<folderName.length;i++){
                                   

                                    if(folderName[i].includes(judgeRs)==true){
                                        // console.log(filedir.replace('DyDown','newDyDown').replace(/\\....年\\第.季度/,'').replace(/\(.*?\)/,''));
                                        const folderIs = filedir.replace('DyDown','newDyDown').replace(/\\....年\\第.季度/,'').replace(/\(.*?\)/,'');                                                                           

                                        if(fs.existsSync(folderIs)==false){
                                            // notExist++;
                                            // console.log('更新数量为：'+notExist);
                                            const ws =fs.createWriteStream(folderIs);
                                            rs.pipe(ws);
                                            // notExist++;
                                            // console.log('更新数量为：'+notExist);
                                        }
                                    }
                                }
                                // if()
                                // const ws =fs.createWriteStream();
                                // rs.pipe(ws);
                            }
                            
                           

                        }  
                        if(isDir){  
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }  
                    }  
                })  
            });  
        }  
    });  
} 
