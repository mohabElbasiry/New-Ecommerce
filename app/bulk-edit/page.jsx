import BulkEdit from '@/components/BulkEdit'
import React from 'react'
import { dataVariants } from '../product/[id]/data'

export default function page() {
  return (
    <div >
    <BulkEdit data={dataVariants.product.variants} /> 
    </div>
  )
}
