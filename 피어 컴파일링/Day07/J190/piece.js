class Position{
    #rank = 0
    #file = 0
    constructor(position){
        this.#rank = position[0]
        this.#file = position[1]
    }
    setPosition(position){
        this.#rank = position[0]
        this.#file = position[1]
    }
    getPosition(){
        return [this.#rank,this.#file]
    }
}

class Piece{
    #color = 0
    constructor(color,position,type,name,movement,maxNum){
        this.#color = color
        this.type = type
        this.name = name
        this.position = new Position(position)
        this.movement=movement
        this.maxNum = maxNum
    }
    getTypeNum(){
        return this.maxNum
    }
    setPosition(position){
        this.position.setPosition(position)
    }
    isColor(color){
        return this.#color==color
    }
    getColor(){
        return this.#color
    }
    getName(){
        return this.name
    }
    getType(){
        return this.type
    }
    getLocation(){
        return this.position.getPosition()
    }
    
    getPath(location){
        let position = this.getLocation()
        let path = []
        let distance = [location[0]-position[0],location[1]-position[1]]
        let direction
        if(Math.abs(distance[0])>Math.abs(distance[1])){
            direction = [distance[0]/Math.abs(distance[0]),0]
        }else{
            direction = [0,distance[1]/Math.abs(distance[1])]
        }
        if(this.movement[1]){
            let selected
            for(let x of this.movement[0]){
                let dirR=false
                let dirF=false
                if(direction[0]){
                    if(x[0]){
                        if(direction[0]*x[0]>0){dirR = true}
                    }
                }else{
                    if(x[0]==0){
                        dirR = true
                    }
                }
                if(direction[1]){
                    if(x[1]){
                        if(direction[1]*x[1]>0){dirF = true}
                    }
                }else{
                    if(x[1]==0){
                        dirF = true
                    }
                }
                if(dirF&&dirR){
                    selected=x
                }
            }
            if(selected){
                path.push([position[0]+selected[0],position[1]+selected[1]])
                while(path[path.length-1][0]!=location[0]&&path[path.length-1][1]!=location[1]){
                    path.push([path[path.length-1][0]+selected[0],path[path.length-1][1]+selected[1]])
                    if(path[path.length-1][0]<0||path[path.length-1][0]>7||path[path.length-1][1]<0||path[path.length-1][1]>7){
                        throw 'destinationError'
                    }
                }
            }

        }else{
            if((Math.abs(distance[0])+Math.abs(distance[1]))>1){
                path.push([position[0]+direction[0],position[1]+direction[1]])
            }
        }
        return path
    }
    possiblePositions(){
        let position = this.getLocation()
        let possible = []
        if(this.movement[1]){
            let iter = [position[0]>7-position[0]?position[0]:7-position[0],position[1]>7-position[1]?position[1]:7-position[1]]
            iter = iter[0]>iter[1]?iter[0]:iter[1]
            for(let x of this.movement[0]){
                for(let n = 1; n <=iter; n++){
                    let a = [position[0]+x[0]*n,position[1]+x[1]*n]
                    if(a[0]<0||a[1]<0||a[0]>7||a[1]>7)continue
                    possible.push(a)
                }
            }
        }else{
            for(let x of this.movement[0]){
                let a = [position[0]+x[0],position[1]+x[1]]
                if(a[0]<0||a[1]<0||a[0]>7||a[1]>7)continue
                possible.push(a)
            }
        }
        return possible
    }
}
module.exports = Piece;