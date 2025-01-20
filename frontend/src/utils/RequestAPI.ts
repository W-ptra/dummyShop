export async function get(path:string,credential?:string){
    try{
        if(credential){
            const data = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${credential}`
                }
            }
            const request = await fetch(path,data);
            const respond = await request.json();
            return respond;
        }
        const request = await fetch(path);
        const respond = await request.json();
        return respond;
    }catch(err:any){
        return undefined;
    }
}
export async function post(path:string,credential:string,payload:any){
    try{
        const data = {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${credential}`
            },
            body:JSON.stringify(payload)
        }
        const request = await fetch(path,data);
        const respond = await request.json();
        return respond;
    }catch(err:any){
        return undefined;
    }
}

export async function put(path:string,credential:string,payload:any){
    try{
        const data = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${credential}`
            },
            body:JSON.stringify(payload)
        }
        const request = await fetch(path,data);
        const respond = await request.json();
        return respond;
    }catch(err:any){
        return undefined;
    }
}

export async function deletes(path:string,credential:string){
    try{
        const data = {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${credential}`
            }
        }
        const request = await fetch(path,data);
        const respond = await request.json();
        return respond;
    }catch(err:any){
        return undefined;
    }
}