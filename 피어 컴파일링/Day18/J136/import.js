import fs from 'fs'

export class Import {
    init(commend){
        const from = commend.match(/(?<=FROM).+(?=TO)/g)[0].replaceAll(' ','')
        const to = commend.match(/(?<=TO).+/g)[0].replaceAll(' ','')

        const fromReadFile = fs.readFileSync(`./${from}.csv`, 'utf8').split('\n');
        const fromColumn = fromReadFile[0].split(',');

        const toReadFile = fs.readFileSync(`./${to}.csv`, 'utf8').split('\n');
        const toColumn = toReadFile[0].split(',');

        if(fromColumn.length !== toColumn.length){
            console.log(`컬럼의 수가 다릅니다.`)
            return
        }

        const result = [];
        for(let i=2;i < fromReadFile.length; i++){
            if(toReadFile.includes(fromReadFile[i]) === false){
                result.push([i,fromReadFile[i]])
            }
        }
        
        if(result.length === 0){
            console.log('겹치지 않는 데이터가 없습니다.')
            return
        }
        
        console.log(`IMPORT COUNT = ${result.length}`)
        for(let i=0; i < result.length; i++){
            const id = result[i][0]
            const content = result[i][1].split(',').reduce((ac,v)=> isNaN(v)? [...ac,`"${v}"`]: [...ac,v],[]);
            console.log(`(${id}, ${content.join(', ')})`)
        }
        
        const mergeData = result.reduce((ac,v)=> [...ac,v[1]],[])
        const data = [...toReadFile,...mergeData]
        console.log(data)
        fs.writeFileSync(`./${to}.csv`, data.join('\n'));
    }
}