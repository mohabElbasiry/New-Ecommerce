import { Children, cloneElement, useState } from "react"

export const LanguageSelect=({children})=>{
    const [lang,setLang]=useState('en')

    const childrenWithProps =  Children.map(children, (child) =>
         cloneElement(child, {  lang })
      );
      const active ="bg-[#eee] px-6 rounded-md  !h-[25px]"
    return(
<div  >
      <nav className=" flex gap-6      w-fit  px-1 rounded h-[33px]  mb-2 
       overflow-hidden items-center " aria-label="Tabs">
        <a
          href="#"
          className={`shrink-0 border-b-2 border-transparent  
           text-sm font-medium text-gray-500 hover:border-gray-300 flex items-center
            hover:text-gray-700 px-2 py-1 ${lang==="en"&&active}`}
        
        onClick={()=>setLang('en')}>
          English
        </a>

        <a
          href="#"
          className={`shrink-0 border-b-2 border-transparent  
            text-sm font-medium text-gray-500 hover:border-gray-300 flex items-center
             hover:text-gray-700 px-2 py-1 ${lang==="ar"&&active}`}
          onClick={()=>setLang('ar')}

      >
          Arabic
        </a>

       
      </nav>
      <div>
      {childrenWithProps}
      </div>

    </div>
    )
}