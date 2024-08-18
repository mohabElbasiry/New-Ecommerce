import Paginator from "@/components/Paginator";

 const TableFooter = ({footerOptions}) => { 
    console.log('footerOptions level 2',footerOptions)

    return ( 
        <section>
            {footerOptions?.paginagtionOptions ? (
                 <Paginator paginagtionOptions={footerOptions.paginagtionOptions} lang={'en'} />
            ) : null }
        </section>
    )
}

export default TableFooter;