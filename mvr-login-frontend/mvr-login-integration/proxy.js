//proxy.ts
import { NextRequest,NextResponse } from "next/server";
// import { publicRoutes,privateRoutes } from "./src/routes/routes";
import { publicRoutes,privateRoutes } from "./src/routes/routes";
import { getCookie } from "cookies-next";

const proxy = (req)=>{
    const cookiesVal = req.cookies.get('myToken')?.value;
    console.log('cookies value ',cookiesVal)
    const path = req.nextUrl.pathname;
    console.log('checking ',req.nextUrl.pathname)
    console.log('path ',path);
    console.log('full url ',req.url)
    if(cookiesVal && publicRoutes.includes(path)){
        console.log('public routes are accessing')
        return NextResponse.redirect(new URL('/',req.url))
    }
if(!cookiesVal && privateRoutes.includes(path)){
    console.log('accessing private routes')
    return NextResponse.redirect(new URL('/login',req.url))
}
    
}
export default proxy;