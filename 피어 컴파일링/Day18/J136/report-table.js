import fs from 'fs'

export class ReportTable {
    init(commend){
        const tableName = commend.split(' ')[2]
        if(fs.existsSync(`./${tableName}.csv`)){
            // 파일 읽어와서 객체로 바꾸기
            const readFile = fs.readFileSync(`./${tableName}.csv`, 'utf8').split('\n');
            const column = readFile[0].split(',');
            const dataObj = [];
    
            for(let i=2; i < readFile.length; i++){
                const value = readFile[i].split(',')
                const temp = {}
                temp['id'] = i-1
                for(let j=0; j < value.length; j++){
                    temp[column[j]] = value[j]
                }
                dataObj.push(temp)
            }
            

            const firstContent = readFile[dataObj[0]['id']+1]
            .split(',')
            .reduce((ac,v)=> isNaN(v)? [...ac,`"${v}"`]: [...ac,v],[]);

            const lastContent = readFile[dataObj[dataObj.length-1]['id']+1]
            .split(',')
            .reduce((ac,v)=> isNaN(v)? [...ac,`"${v}"`]: [...ac,v],[]);

            console.log(`\n컬럼 종류 : ${column.join(', ')}`)
            console.log(`전체 레코드 수 : ${dataObj.length}개`)
            console.log(`최초 레코드 : (${dataObj[0]['id']}, ${firstContent.join(', ')})`)
            console.log(`마지막 레코드 : (${dataObj[dataObj.length-1]['id']}, ${lastContent.join(', ')})\n`)

        } else{console.log(`테이블이 존재하지 않습니다.`)}
    }
}