import fs from 'fs'

export class Update {
    init(commend){
        const tableName = commend.split(' ')[1];
        const target = commend.match(/(?<=SET).+(?=WHERE)/g)[0].replaceAll(' ','').split('=')
        const targetColumn = target[0]
        const targetvalue = isNaN(target[1]) ? target[1].replaceAll('"','') : Number(target[1])
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
            dataObj[targetIdx][targetColumn] = targetvalue
            readFile[dataObj[targetIdx]['id']+1] = Object.values(dataObj[targetIdx]).slice(1).join(',')
            const content = readFile[dataObj[targetIdx]['id']+1]
            .split(',')
            .reduce((ac,v)=> isNaN(v)? [...ac,`"${v}"`]: [...ac,v],[]);
            console.log(`UPDATED (${id}, ${content.join(', ')})`);
            fs.writeFileSync(`./${tableName}.csv`, readFile.join('\n'));
        }
    }
}