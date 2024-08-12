import { Children, cloneElement, useState } from "react"

export const LanguageSelect=({children})=>{
    const [lang,setLang]=useState('ar')

    const childrenWithProps =  Children.map(children, (child) =>
         cloneElement(child, {  lang })
      );

    return(
<div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-6" aria-label="Tabs">
        <a
          href="#"
          className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        
        onClick={()=>setLang('en')}>
          En
        </a>

        <a
          href="#"
          className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          onClick={()=>setLang('ar')}

      >
          Ar
        </a>

       
      </nav>
      <div>
      {childrenWithProps}
      </div>

    </div>
    )
}