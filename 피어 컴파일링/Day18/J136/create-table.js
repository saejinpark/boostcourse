import fs from 'fs'

export class CreateTable{    
    init(commend){
        // () 안에 컬럼 자르기
        const columnArr = commend.match(/(?<=\()(.*?)(?=\))/g)[0].split(',');
        const tableName = commend.split(' ')[2]
        
        // 컬럼 갯수 검사하기
        if(columnArr.length > 9 || columnArr.length === 0){
            console.log('입력 가능한 컬럼의 수는 1~9개 입니다.');
            return 
        }
        
        // 컬럼 가공하기
        const newColumnArr = []
        for(let i=0;i < columnArr.length; i++){
            newColumnArr.push(columnArr[i].trim().split(' '));
        }
        
        // 컬럼 내용 검사하기
        for(let i=0;i < newColumnArr.length; i++){
            if(newColumnArr[i].length > 2){
                console.log('띄어쓰기는 지원하지 않습니다.')
                return
            }
            if(newColumnArr[i][0] === 'id'){
                console.log('id는 컬럼 이름으로 사용할 수 없습니다.')
                return
            }
            if(newColumnArr[i][1] !== 'Numeric' && newColumnArr[i][1] !== 'String' ){
                console.log('타입은 Numeric, String 만 지원합니다.')
                return
            }
        }
        if(fs.existsSync(`./${tableName}.csv`)){
            console.log(`이미 같은 이름의 csv 파일이 존재합니다.`)
        }else{
            // csv 파일 초기 내용
            const columnName = newColumnArr.reduce((ac,v)=> [...ac,v[0]],[])
            const data = `${columnName.join(',')}\n-----------`
            fs.writeFileSync(`./${tableName}.csv`, data);
        }
    }
}