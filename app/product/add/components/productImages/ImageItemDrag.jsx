import { Reorder, useDragControls } from 'framer-motion';
import React from 'react'
import { ReorderIcon } from '../drageControl';
import { cn } from '@/lib/utils';

export default function ImageItemDrag({child,item,index}) {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
    onDragEnd={(e) => e.stopPropagation()}
    dragListener={false}
    dragControls={dragControls}
    value={item}
    key={item}
    id={item}
   
    // as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    whileDrag={{ scale: 1 }}
    transition={{ duration: 0.2 }}
    className={cn(
                    index === 0 ? " col-span-3 row-span-3 " : "  ",
                    "relative object-contain object-top rounded-2xl border aspect-square"
                  )}
  >
     {child}
    <div className='absolute top-[5%] left-[5%] scale-150 '> <ReorderIcon  dragControls={dragControls} /></div> 
    </Reorder.Item>
  )
}
