
// console.log("run js");
// algorithm 
// فكرة اللعبة هيكون فيه مصفوفة عبارة عن اربع اعمدة واربع صفوف 
// html كل عنصر في المصفوفة ليه عنصر مقابل ليه في ال 
// هيكون فيه فانكشن بتضيف رقم 2 او رقم 4  في مكان عشوائى 
//قبل اضافة الرقم لازم نتاكد ان المكان العشوائى ده يحتوى ع 0  ان 
// html بعد اضافة الرقم في المصفوفه هنضيف الرقم ده في العنصر المقابل ليه في
// هنعمل ايفنت للاسهم وكل زر هينفذ الفانكشن الخاصة به 
//  مثال اذا كان ايفنت يسار ف هيتم اخذ كل صف من المصفوفة وتخزينه في ارراي
// الصف الواحد يحتوى على ارقام واصفار هيتم ارسال الارراي الى فانكشن لازالة الاصفار 
//بعدها هيتم اختبار اذا كان عنصرين لهما نفس القيمة سيتم جمعهم في عنصر واحد ووضع الاخر ب 0

// بعدها اذا كان الايفنت يسار هيتم اضافه الاراى الى المصفوفة مرة اخرى 
//واذا كان الايفنت يمين ف هيتم اضافة اصفار في بداية الاراى حتى تكون الارقام ناحية اليمين 
// وبنفس الطريقة اذا كان الايفنت لاعلى او لاسفل  مع اختلاف اننا سناخد من المصفوفة العمود وليس الصف 
// attribue position بعد ترتيب الارقام في المصفوفة حسب الايفنت وكتابة كل عنصر في المصفوفة في العنصر المقابل له   عن طريق  
// هيتم اختيار مكان عشوائى اخر لكتابة 2 او 4 
 
// بعد  ذلك 
// فانكشن لاختبار هل يوجد اماكن فارغة لاضافة رقم 2 او 4 او لا 
// بعدها فانكشن لاختبار هل يوجد عنصرين متشابهين لجمعهم او لا 
// if 2 fun return false then game over



//first add event to the start button that call fun start game 
// start game set score 0 and call fun create grid and generate two
// go to 
// 


var grid=document.querySelector(".grid");
const startButton=document.getElementById("start_button");
const container=document.querySelector(".container");
const coverScreen=document.querySelector(".cover_screen");
const result=document.getElementById("result");
const overText=document.getElementById("over_text");
 var matrix,
 score,
 isswiped,
 touchy,
 inintialy=0,
 touchx,
 initialx=0,
 row=4,
 coulumn=4;


 var rectleft= grid.getBoundingClientRect().left;
//  console.log(rectleft);
var recttop= grid.getBoundingClientRect().top;

// const getxy=(e)=>{
//     touchx=e.touches[0].pageX-rectleft;
//     touchy=e.touches[0].pageY-rectleft;
// };
// fun create grid
// this fun is create elements and add attribute position
//
const createGrid= ()=>{

    for(var i=0; i<row; i++) //loop for row 
    {

        for(let j=0; j<coulumn; j++) //loop for column 
        {
            const boxDiv=document.createElement("div");
            boxDiv.classList.add("box");
            boxDiv.setAttribute("data-position", `${i}_${j}`);
            grid.appendChild(boxDiv);
           // boxDiv.innerHTML="2";
        }

    }
}
// createGrid();

const adjacentcheck=(arr) =>{  // check if two elements is the same
    for( var i=0; i<arr.length-1; i++)
    {
        if(arr[i]==arr[i+1])
        {
            return true;
        }

    }

    return false;
}


const possibleMovescheck=()=>  // loop in matrix ti check if tow element the same or not
{
    for(var i in matrix)
    {
        if(adjacentcheck(matrix[i]))
        {
            return true;
        }

        let collar=[];
        for( let j=0; j<coulumn; j++)
        {
            collar.push(matrix[i][j])
        }
        if(adjacentcheck(collar))
        {
            return true;
        }

    }
    return false;
}

const randomPosition = (arr)=> // return random position form 0 to length of arr
{
    return Math.floor(Math.random()*arr.length);
};
// console.log(randomPosition);
const hasEmptyBox=()=>  //check to find empty box in matrix 
{
    for(var r in matrix)
    {
        for(var c in matrix[r])
        {
            if(matrix[r][c]==0)
            {
                return true;
            }
        }
    }
    return false;
};

const gameOverCheck=()=>
{
    if(!possibleMovescheck())
    {
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        overText.classList.remove("hide");
        result.innerHTML=`final score : ${score}`;
        startButton.innerText="restart game";
    }
}

const generateTwo=()=>
{
    if(hasEmptyBox())
    {
        let randonRow= randomPosition(matrix);
        let randomCol= randomPosition(matrix[randonRow]);
        if( matrix[randonRow][randomCol]==0)
        {
            matrix[randonRow][randomCol]=2;
            let ele=document.querySelector(`[data-position='${randonRow}_${randomCol}']`);
        //    console.log(`[data-position='${randonRow}_${randomCol}']`);
            ele.innerHTML=2;
            ele.classList.add("box-2");
        }
        else{
            generateTwo();
        }
    }

    gameOverCheck();
}



const generatefour=()=>
{
    if(hasEmptyBox())
    {
        let randonRow= randomPosition(matrix);
        let randomCol= randomPosition(matrix[randonRow]);
        if( matrix[randonRow][randomCol]==0)
        {
            matrix[randonRow][randomCol]=4;
            let ele=document.querySelector(`[data-position = '${randonRow}_${randomCol}']`);
            ele.innerHTML=4;
            ele.classList.add("box-4");
        }
        else{
            generatefour();
        }
    }
 
    gameOverCheck();
}


const removezero=(arr)=> arr.filter((num)=>num);
const checker=(arr,reverseArr=false)=>
{   
    // reverseArr ? removezero(arr).reverse():
    arr= removezero(arr);
    for( let i=0; i<arr.length-1; i++)
    {
        if(arr[i]==arr[i+1])
        {
            arr[i]+=arr[i+1];
            arr[i+1]=0;
            score+=arr[i];
        }
    }
    // reverseArr ? removezero(arr).reverse():
    arr= removezero(arr);
    let missingcount= 4- arr.length;
    while(missingcount>0)
    {
         if(reverseArr)
         {
            arr.unshift(0);
         }

         else{
            arr.push(0);
         }
        // arr.push(0);
         missingcount-=1;
    }
    document.getElementById("score").innerHTML=score;
    return arr;
    
}  


const slideDown=()=>{
    for(var i=0; i<coulumn; i++){
        var num=[];
        for(var j=0; j<row; j++)
        {
            num.push(matrix[j][i]);
    
        }
    
        num=checker(num,true);
        for(var j=0; j<row; j++)
        {
            matrix[j][i]=num[j];
            let ele=document.querySelector(`[data-position='${j}_${i}']`);
            ele.innerHTML=matrix[j][i]? matrix[j][i]:"";
            ele.classList.value="";
            ele.classList.add("box",`box-${matrix[j][i]}`);
        }
    
    
    }
    let decision=Math.random()> 0.5 ? 1:0;
    if(decision==1)
    {
     setTimeout(   generateTwo,200 )
    }
        else

        setTimeout(    generatefour,200 );
        
    
    
    }



const slideUp=()=>{
for(var i=0; i<coulumn; i++){
    var num=[];
    for(var j=0; j<row; j++)
    {
        num.push(matrix[j][i]);

    }

    num=checker(num);
    for(var j=0; j<row; j++)
    {
        matrix[j][i]=num[j];
        let ele=document.querySelector(`[data-position='${j}_${i}']`);
        ele.innerHTML=matrix[j][i]? matrix[j][i]:"";
        ele.classList.value="";
        ele.classList.add("box",`box-${matrix[j][i]}`);

    }

}

let decision=Math.random()> 0.5 ? 1:0;
if(decision==1)
{
 setTimeout(   generateTwo,200 )
}
    else{

    setTimeout(    generatefour,200 );
    }
}


const slideRight=()=>{
    for(var i=0; i<row; i++){
        var num=[];
        for(var j=0; j<coulumn; j++)
        {
            num.push(matrix[i][j]);
    
        }
    
        num=checker(num,true);
        for(var j=0; j<coulumn; j++)
        {
            matrix[i][j]=num[j];
            // let el=document.querySelector(`[data-position='${randonRow}_${randomCol}']`);

            let ele=document.querySelector(`[data-position = '${i}_${j}']`);
            // console.log(`[data-position = '${i}_${j}']`);
            ele.innerHTML=matrix[i][j]? matrix[i][j]:"";
            ele.classList.value="";
            ele.classList.add("box",`box-${matrix[i][j]}`);
    
        }
    
    }
    
    let decision=Math.random()> 0.5 ? 1:0;
    if(decision==1)
    {
     setTimeout(   generateTwo,200 )
    }
        else{
    
        setTimeout(    generatefour,200 );
        }

}





const slideLeftt=()=>{
    for(var i=0; i<row; i++){
        var num=[];
        for(var j=0; j<coulumn; j++)
        {
            num.push(matrix[i][j]);
    
        }
    
        num=checker(num);
        for(var j=0; j<coulumn; j++)
        {
            matrix[i][j]=num[j];
            let ele=document.querySelector(`[data-position='${i}_${j}']`);
            // if(matrix[i][j]==0){matrix[i][j]=" ";}
            
            ele.innerHTML=matrix[i][j]?matrix[i][j]:"";
            ele.classList.value="";
            ele.classList.add("box",`box-${matrix[i][j]}`);
    
        }
    
    }
    
    let decision=Math.random()> 0.5 ? 1:0;
    if(decision==1)
    {
     setTimeout(   generateTwo,200 )
    }
    else{
    
     setTimeout(   generatefour,200 );
    }

}



document.addEventListener ("keyup",(a)=>
{
    console.log(a);
    if(a.code=="ArrowLeft"){
        slideLeftt();
    }
    else if(a.code=="ArrowRight")
    {
        // console.log("right");
        slideRight();
    }
    else if(a.code=="ArrowUp")
    {
        // console.log("up");
        slideUp();
    }
    else if(a.code=="ArrowDown")
    {
        // console.log("down");
        slideDown();
    }
}

)












const startGame=()=>{  //function to start game
    score=0;
    document.getElementById("score"),innerHTML=score;
    grid.innerHTML="";
    matrix=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    container.classList.remove("hide");
    coverScreen.classList.add("hide");
    createGrid();
    generateTwo();
    generateTwo();
    console.log(matrix[1]);
}

startButton.addEventListener("click",()=>  
{
    console.log("start");
    startGame();
})