import Link from "next/link"

export const MenuItem=({open,menuItem,cn})=>{



    return( 
 
    <li  className={`${open&&'itemLi'}`} key={menuItem.title}>
        <Link
          href={menuItem.href}
          className="flex gap-2 items-center menu_side rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
       <div className="w-10 h-10   rounded-full flex justify-center items-center text-white"> 
       
       <img src="/sidemenu/555.svg"  width={20} height={20}/>

        {menuItem.Icon}
        </div>  <p  className={cn( open?"block":"hidden" 
              ,"transition-all duration-700 delay-1000   truncate ...")}> {menuItem.title}</p>
        </Link>
      </li>)
}