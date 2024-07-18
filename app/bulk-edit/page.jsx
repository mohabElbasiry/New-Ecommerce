import VariantDetails from '@/components/VariantDetails'
import React from 'react'
import { dataVariants } from '../product/[id]/data'

export default function page() {
  return (
    <div className='p-5 flex justify-center w-full' >
    <VariantDetails data={dataVariants.product.variants} /> 
    </div>
  )
}
