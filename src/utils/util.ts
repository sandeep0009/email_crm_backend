

export function calculateDelay(scheduleTime:string){
   
    const now= new Date().getTime();
    const traget=new Date(scheduleTime).getTime();
    return Math.max(traget-now,0);
}