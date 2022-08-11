import fs from 'fs'

export class InsertInto {
    init(commend){
        const tableName = commend.split(' ')[2]
        const arr = commend.match(/(?<=\()(.*?)(?=\))/g)
        const columnArr = []
        const valueArr = []
        // 컬럼과 밸류 구분하기
        for(let i=0;i < arr.length; i++){
            if(i === 0){columnArr.push(...arr[i].replaceAll(' ', '').split(','));}
            if(i === 1){valueArr.push(...arr[i].replaceAll(' ', '').replaceAll('"','').split(','));} 
        }
        
        // 컬럼 갯수 검사하기
        const readFile = fs.readFileSync(`./${tableName}.csv`, 'utf8').split('\n')
        if((readFile[0].split(',').length !== columnArr.length) || columnArr.length !== valueArr.length){
            console.log(`컬럼의 수가 맞지 않습니다.`)
            return
        }

        // 테이블에 추가
        const id = readFile.length -1
        fs.appendFile(`./${tableName}.csv`,`\n${valueArr.join(',')}`, (err)=>{ 
            if(err){console.log(err)}
        })
        // 문자열 " " 붙여주기
        const printValue = valueArr.reduce((ac,v) => isNaN(v) ? [...ac,`"${v}"`] : [...ac,v],[])
        console.log(`INSERTED (${id}, ${printValue.join(', ')}) `)
    }
}