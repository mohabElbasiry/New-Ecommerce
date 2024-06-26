export const ProductNav = ({nav,setNav}) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          <option select>Notifications</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <button
              href="#"
              className="shrink-0 border-b-2 border-[#333] px-1 pb-4 text-sm font-medium text-[#333]"
              onClick={()=>setNav('basic')}
            >
              Basic Information
            </button>

            <button
             
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              onClick={()=>setNav('Varations')}

            >
              Product Varations
            </button>

            <button
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              onClick={()=>setNav('Seo')}

            >
              Seo
            </button>
            <button
              href="#"
              className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              aria-current="page"
              onClick={()=>setNav('Notifications')}

            >
              Notifications
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
