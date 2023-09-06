const apiCall = async(url,signal,id)=>{
 try{
  let res =  await fetch(url,{signal});
  res = await res.json();
  clearTimeout(id);
  console.log(res);
    }
  catch(err){
    console.log(err,"error");
  }
}

const myCustomFetch= async(url,duration)=>{
const  controller = new AbortController();
const signal = controller.signal;
const id = setTimeout(()=>{
  controller.abort();
console.log("ABORTED")  
},duration)

apiCall(url,signal,id);
}

myCustomFetch('https://jsonplaceholder.typicode.com/todos/1',1000);

