let string=')()())'


var longestValidParentheses = function(s) {
    const n=s.length;
    let arr=[];
    let arrMap=new Map([
        [')','(']
    ]);
    let count=0;
    for(let t of s){
        if(arrMap.has(t)){
            if(arr[arr.length-1]!==arrMap.get(t)){
                continue;
            }
            // arr.push(t);
            count=count+2;
        }
        arr.push(t);
        console.log(arr+'---'+count)
    }
    return count;

};
longestValidParentheses(string)
