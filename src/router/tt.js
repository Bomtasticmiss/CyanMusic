let string='([}}])'
// console.log(string[0]);
let st='()[]{}'
// var isValid = function(s) {
//     let arr=[]
//     if(s.length%2!==0) return false 
//     for(let i=0;i<s.length;i++){
//         let top=arr[arr.length-1]
//         console.log(top)
//         switch(s[i]){
//             case "(":
//             arr.push(s[i])
//             break;
//             case "{":
//             arr.push(s[i])
//             break;
//             case "[":
//             arr.push(s[i])
//             break;
//             case ")":
//             if(top==="(") arr.pop()
//             break;
//             case "}":
//             if(top==="{") arr.pop()
//             break;
//             case "]":
//             if(top==="[") arr.pop()
//             break;
//         }
//     }
//     if(arr.length===0) return true;
//     return false;
// };

var isValid = function(s) {
    const n = s.length;
    if (n % 2 === 1) {
        return false;
    }
    const pairs = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ]);
    const stk = [];
    for (let ch of s){
        if (pairs.has(ch)) {
            if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
                return false;
            }
            stk.pop();
        } 
        else {
            stk.push(ch);
        }
    };
    return !stk.length;
};



const tt=isValid(string);
console.log(tt)

