import fs from 'fs'

export class DeleteFrom {
    init(commend){
        // 조건이 있는지 확인
        if(commend.includes('=')){
            const tableName = commend.split(' ')[2];
            // 조건 추출하기
            const condition = commend.match(/(?<=WHERE).+/g)[0].replaceAll(' ','').split('=')
            const conditionColumn = condition[0];
            const conditionValue = isNaN(condition[1]) ? condition[1].replaceAll('"','') : Number(condition[1])
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

            // 조건에 맞는 데이터 삭제
            let targetIdx = null
            for(let i = 0; i < dataObj.length; i++){
                if(dataObj[i][conditionColumn] === conditionValue){
                    targetIdx = i
                    break
                }
            }
            if(targetIdx === null){
                console.log(`조건에 맞는 데이터가 존재하지 않습니다.`)
            }else{
                const id = dataObj[targetIdx]['id']
                const content = readFile[dataObj[targetIdx]['id']+1]
                .split(',')
                .reduce((ac,v)=> isNaN(v)? [...ac,`"${v}"`]: [...ac,v],[]);
                console.log(`DELETED (${id}, ${content.join(', ')})`);
                readFile.splice(targetIdx+2,1)
                fs.writeFileSync(`./${tableName}.csv`, readFile.join('\n'));
            }
            

        }
        else{console.log('조건이 없습니다!'); return}



    }
}