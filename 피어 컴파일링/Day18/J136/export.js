import fs from 'fs'

export class Export {
    init(commend){
        const from = commend.match(/(?<=FROM).+(?=WHERE)/g)[0].replaceAll(' ','')
        if(fs.existsSync(`./${from}.csv`)){
            const to = commend.match(/(?<=TO).+(?=FROM)/g)[0].replaceAll(' ','')
            const condition = commend.match(/(?<=WHERE).+/g)[0].replaceAll(' ','').split('=')
            const conditionColumn = condition[0];
            const conditionValue = Number(condition[1]) !== NaN ? condition[1].replaceAll('"','') : Number(condition[1])
            // 파일 읽어와서 객체로 바꾸기
            const readFile = fs.readFileSync(`./${from}.csv`, 'utf8').split('\n');
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

            // 조건탐색
            const result = []
            for(let i = 0; i < dataObj.length; i++){
                if(dataObj[i][conditionColumn] === conditionValue){
                    result.push(i)
                }
            }

            if(result.length === 0){
                console.log(`조건에 맞는 데이터가 없습니다.`)
                return
            }

            const data = [readFile[0],readFile[1]]

            console.log(`EXPORT COUNT = ${result.length}`)
            for(let i=0; i < result.length; i++){
                const id = dataObj[result[i]]['id']
                data.push(readFile[dataObj[result[i]]['id']+1])
                const content = readFile[dataObj[result[i]]['id']+1]
                .split(',')
                .reduce((ac,v)=> isNaN(v)? [...ac,`"${v}"`]: [...ac,v],[]);
                console.log(`(${id}, ${content.join(', ')})`);
            }

            fs.writeFileSync(`./${to}.csv`, data.join('\n'));
            console.log(`${to}.csv 파일이 생성되었습니다.`)


        }else{console.log('테이블이 존재하지 않습니다.')}
    }
}