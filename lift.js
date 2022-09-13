let initial=1;
let request=[];
let current=[];
let temp=[];
let waiting=[];
let waitTemp=[];
let x=[];
let updatedCurrent1=[];
let updatedCurrent=[];
let up_direction;
let liftStatus=0;
let timer;

let max_num;
let floor4=document.querySelector("#floor4");
let floor3=document.querySelector("#floor3");
let floor2=document.querySelector("#floor2");
let floor1=document.querySelector("#floor1");
let click4=document.querySelector("#click4");
let click3=document.querySelector("#click3");
let click2=document.querySelector("#click2");
let click1=document.querySelector("#click1");


function liftUp(startFloor,endFloor){
    initial=initial+1;
    console.table(current);
    console.log(`lift in ${initial} floor`);
   
    console.log("-----------------");
    //console.log(waiting);
    if(waiting.length!==0){
        waitTemp=waiting.filter(function(i){
            if((i.from===initial && (i.to>initial && i.to <= 4))|| (i.from===4 && i.to < 4 && initial ===4) ){//////////////////////
                return true;
            }
            else{
                return false;
            }

        })
    }
    if(waitTemp.length!==0){
        
        waiting=waiting.filter(function(i){
            if(waitTemp.includes(i)){
                return false;
            }
            else{
                return true;
            }
        })
        current = [...current,...waitTemp];
        

    }
   
    waitTemp=[]
    updatedCurrent1=current.filter(function(i){
        if(i.to===initial){
            return false;
        }
        else{
            return true;
        }
    })
    if(updatedCurrent1.length!==0){
        current=updatedCurrent1;
    }
    

    if(initial===endFloor){
        
        clearInterval(timer);
        if(endFloor===current[0].to){
            temp=current.filter(function(eachValue){
                if(eachValue.to===initial){
                    return true;
                }
                else{
                    return false;
                }

            })
            if(temp.length!==0){

                updatedCurrent=current.filter(function(i){
                    if(temp.includes(i)){
                        return false;

                    }
                    else{
                        return true;
                    }
                })
                current=updatedCurrent;

            }

        }
        liftFunction()
    }
    
    

}

function liftDown(startFloor,endFloor){
    initial=initial-1;
    console.table(current);
    console.log(`lift in ${initial} floor`);
    
    console.log("-----------------");
   
   // console.log(waiting);
    if(waiting.length!==0){
        waitTemp=waiting.filter(function(i){
            if((i.from===initial && (i.to<initial && i.to >= 1))|| (i.from===1 && i.to > 1 && initial ===1) ){
                return true;
            }
            else{
                return false;
            }

        })

    }
    if(waitTemp.length!==0){
        
        waiting=waiting.filter(function(i){
            if(waitTemp.includes(i)){
                return false;
            }
            else{
                return true;
            }
        })
        current = [...current,...waitTemp];
        

    }
    
    updatedCurrent1=current.filter(function(i){
        if(i.to===initial){
            return false;
        }
        else{
            return true;
        }
    })
    if(updatedCurrent1.length!==0){
        current=updatedCurrent1;
    }
    waitTemp=[]
    if(initial===endFloor){
        
        clearInterval(timer);
        if(endFloor===current[0].to){
            temp=current.filter(function(eachValue){
                if(eachValue.to===initial){
                    return true;
                }
                else{
                    return false;
                }

            })
            if(temp.length!==0){

                updatedCurrent=current.filter(function(i){
                    if(temp.includes(i)){
                        return false;

                    }
                    else{
                        return true;
                    }
                })
                current=updatedCurrent;
            }

        }
        liftFunction()
    }
    
    
}


function moveTo(startFloor,endFloor){
    if(startFloor<endFloor){
        timer=setInterval(function(){
            liftUp(startFloor,endFloor);
        },10000)

    }
    else{
        timer=setInterval(function(){
            liftDown(startFloor,endFloor);
        },10000)
    }

}


function liftFunction(){
    //from to path finding
    
    if(current.length===0 && waiting.length===0){
        console.table(current);
        console.log("Lift empty and back to rest");
        liftStatus=0;
        return;
    }
    if(current.length==0 && waiting.length!==0){
        current = [...waiting];
        waiting=[];
        console.table(current);
    }
  
    let x=current[0].from;
    let y=current[0].to;
    if(x===initial){
        moveTo(x,y)
    }
    else{
        moveTo(initial,x)
    }

     
}
    
function floor(event){
    let from=event.target.value;
    let toElement=document.getElementById(`floor${from}`);
    let to=toElement.value;
    let a = {
        from : parseInt(from),
        to:parseInt(to)
    }
    if(liftStatus===0){
        current.push(a);
        liftStatus=1;
        liftFunction()
    }
    else{
        waiting.push(a);

    }
}
