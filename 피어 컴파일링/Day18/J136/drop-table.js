import fs from 'fs'

export class DropTable {
    init(commend){
        const tableName = commend.split(' ')[2]
        if(fs.existsSync(`./${tableName}.csv`)){
            fs.unlink(`./${tableName}.csv`,(err)=>{
                if(err){console.log(err)}
            })
            console.log(`${tableName}.csv 파일을 삭제했습니다.`)
        }else{console.log(`${tableName}.csv 파일이 없습니다.`)}
    }
}