import { MenuItem } from './menuItem';

export const MenuList = ({ menu, open, cn }) => {
  return (
    <>
      <ul className="mt-2 space-y-1 px-5 pl-[3rem]">
        {menu?.map((submenu, index) => {
          return (
            <>
              {submenu?.subMenu?.length ? (
                <details
                  className="group [&_summary::-webkit-details-marker]:hidden
       transition-all duration-700"
                >
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <div className="text-sm font-medium flex items-center gap-2 ">
                      <div
                        className="w-10 h-10   rounded-full flex justify-center items-center
                    text-white"
                      >
                        {submenu.Icon}
                      </div>{' '}
                      <p
                        className={cn(
                          open ? 'block' : 'hidden',
                          'transition-all duration-700 delay-1000   truncate ...',
                        )}
                      >
                        {submenu.title}
                      </p>
                    </div>
                    <div
                      className="shrink-0 transition duration-300 
                 group-open:-rotate-180"
                    >
                      {open && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </summary>

                  <MenuList cn={cn} menu={submenu?.subMenu} open={open} />
                </details>
              ) : (
                <MenuItem menuItem={submenu} cn={cn} open={open} />
              )}
            </>
          );
        })}
      </ul>
    </>
  );
};
